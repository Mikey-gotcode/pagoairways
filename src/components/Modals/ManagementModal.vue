<template>
  <!-- Modal backdrop -->
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
    <div class="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center pb-3 border-b-2 mb-4">
        <h3 class="text-2xl font-bold text-gray-800">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700" aria-label="Close">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body / Form -->
      <form @submit.prevent="submitForm" enctype="multipart/form-data" novalidate>
        <div class="grid grid-cols-1 gap-6 mb-6">

          <!-- dynamic text fields (no image_url input) -->
          <div v-for="(value, key) in formFields" :key="key">
            <label :for="key" class="block text-sm font-medium text-gray-700 capitalize mb-1">{{ formatLabel(key) }}</label>

            <input
              v-if="key === 'description'"
              :id="key"
              v-model="formFields[key]"
              type="text"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm text-black"
              required
            />

            <input
              v-else-if="key === 'affiliate_link'"
              :id="key"
              v-model="formFields[key]"
              type="url"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm  text-black"
            />

            <input
              v-else
              :id="key"
              v-model="formFields[key]"
              type="text"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm  text-black"
              :required="isRequired(key)"
            />
          </div>

          <!-- Image file input (styled so filename appears black) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>

            <input
              ref="fileInput"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              :multiple="allowMultiple"
              @change="handleFileChange"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm text-black
                     file:bg-white file:text-black file:border file:px-3 file:py-1 file:rounded file:mr-4 file:cursor-pointer"
            />

            <!-- Previews: selected files (priority) -->
            <div v-if="selectedPreviews.length" class="mt-3 grid grid-cols-4 gap-3">
              <div v-for="(p, idx) in selectedPreviews" :key="idx" class="flex flex-col items-start">
                <img loading="lazy" :src="p.url" class="h-20 w-20 object-cover rounded-md border" alt="preview" />
                <div class="mt-1 text-xs break-all">{{ p.name }}</div>
                <button type="button" @click="removeSelectedFile(idx)" class="mt-1 text-xs px-2 py-1 border rounded">Remove</button>
              </div>
            </div>

            <!-- If no selected files show existing stored image preview (if present) -->
            <div v-else-if="existingImageUrl" class="mt-3 flex items-center space-x-4">
              <img loading="lazy" :src="existingImageUrl" alt="existing" class="h-20 w-20 object-cover rounded-md border" />
              <div>
                <p class="text-sm text-gray-700 break-all">{{ existingImageFileName }}</p>
                <div class="mt-2 space-x-2">
                  <button type="button" @click="clearExistingImage" class="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50">Clear existing</button>
                </div>
              </div>
            </div>

            <!-- No image at all hint -->
            <p v-else class="text-sm text-gray-500 mt-2">No image selected.</p>
          </div>
        </div>

        <!-- client error -->
        <div v-if="clientError" class="mb-4 text-sm text-red-600">
          {{ clientError }}
        </div>

        <!-- Footer -->
        <div class="flex justify-end space-x-4">
          <button type="button" @click="closeModal" class="px-6 py-2 border rounded-full text-gray-700 hover:bg-gray-100">Cancel</button>
          <button :disabled="isSubmitting" type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-full">
            <span v-if="isSubmitting">Saving…</span>
            <span v-else>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  title: { type: String, default: 'Modal Title' },
  item: { type: Object, default: () => ({}) } // may include nested image info for preview
});
const emit = defineEmits(['close', 'save']);

// config: allow multiple file uploads? set false for single-file backend
const allowMultiple = false;

const formFields = ref({});
const editingItemId = ref(null);

// existing stored image preview (not an input)
const existingImageUrl = ref(null);
const existingImageCleared = ref(false);

// selected files + previews
const selectedFiles = ref([]);
const selectedPreviews = ref([]);
const objectUrls = ref([]);
const fileInput = ref(null);

// ui state
const isSubmitting = ref(false);
const clientError = ref('');

// initialize from props.item
watch(() => props.item, (newItem) => {
  if (newItem && Object.keys(newItem).length) {
    editingItemId.value = newItem.id ?? null;
    // copy fields except id and any image object
    const { id, image, image_url, ...fields } = newItem;
    formFields.value = { ...fields };

    // determine existing image URL for preview (if backend returns either image_url or nested image)
    existingImageUrl.value = image_url ?? (image && (image.url || image.path || image.filename)) ?? null;
    existingImageCleared.value = false;
    clearSelectedFiles();
  } else {
    editingItemId.value = null;
    formFields.value = {};
    existingImageUrl.value = null;
    existingImageCleared.value = false;
    clearSelectedFiles();
  }
}, { immediate: true });

// computed helper for existing image filename
const existingImageFileName = computed(() => {
  if (!existingImageUrl.value) return '';
  try { return existingImageUrl.value.split('/').pop(); } catch { return ''; }
});

// cleanup object URLs
function revokeObjectUrls() {
  objectUrls.value.forEach(u => {
    try { URL.revokeObjectURL(u); } catch {}
  });
  objectUrls.value = [];
}
onUnmounted(revokeObjectUrls);

// file handlers
function handleFileChange(e) {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;
  clearSelectedFiles();
  if (allowMultiple) {
    files.forEach(addSelectedFile);
  } else {
    addSelectedFile(files[0]);
  }
}

function addSelectedFile(file) {
  selectedFiles.value.push(file);
  const url = URL.createObjectURL(file);
  objectUrls.value.push(url);
  selectedPreviews.value.push({ url, name: file.name });
  // selecting new file implies replacing existing
  existingImageCleared.value = true;
}

function clearSelectedFiles() {
  selectedFiles.value = [];
  selectedPreviews.value = [];
  if (fileInput.value) fileInput.value.value = '';
  revokeObjectUrls();
}

function removeSelectedFile(idx) {
  if (idx < 0 || idx >= selectedFiles.value.length) return;
  const u = selectedPreviews.value[idx].url;
  try { URL.revokeObjectURL(u); } catch {}
  selectedFiles.value.splice(idx, 1);
  selectedPreviews.value.splice(idx, 1);
  if (!selectedFiles.value.length) existingImageCleared.value = false;
}

function clearExistingImage() {
  existingImageCleared.value = true;
  existingImageUrl.value = null;
  clearSelectedFiles();
}

// helper for required fields
const isRequired = (key) => ['name', 'description'].includes(key);
const formatLabel = (key) => String(key).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

/* ------------------ NEW: dumpFormData helper ------------------
   Prints a readable dump of the FormData to console so you can
   confirm file entries and other fields before network submission.
*/
function dumpFormData(fd) {
  if (!(fd instanceof FormData)) {
    console.warn('dumpFormData: not a FormData instance', fd);
    return;
  }

  console.groupCollapsed('FormData dump');
  for (const [key, value] of fd.entries()) {
    if (value instanceof File || value instanceof Blob) {
      console.log(key, {
        type: 'File',
        name: value.name ?? '(no name)',
        size: value.size ?? '(no size)',
        mime: value.type ?? '(no type)',
        object: value,
      });
    } else {
      console.log(key, value);
    }
  }
  console.groupEnd();
}
/* ------------------------------------------------------------- */

// build FormData and emit (with dump)
const submitForm = () => {
  clientError.value = '';
  isSubmitting.value = true;

  try {
    const creating = !editingItemId.value;

    // client-side validation (create requires a file)
    if (creating && selectedFiles.value.length === 0) {
      clientError.value = 'Please select at least one image before creating a destination.';
      return;
    }

    const fd = new FormData();

    // append regular fields
    for (const key in formFields.value) {
      if (!Object.prototype.hasOwnProperty.call(formFields.value, key)) continue;
      const val = formFields.value[key];
      if (val !== undefined && val !== null) fd.append(key, val);
    }

    // append files if selected
    if (selectedFiles.value.length > 0) {
      if (allowMultiple) {
        selectedFiles.value.forEach(f => fd.append('images[]', f, f.name));
      } else {
        fd.append('image', selectedFiles.value[0], selectedFiles.value[0].name);
      }
    } else {
      // no new file selected
      if (editingItemId.value && existingImageCleared.value) {
        // user cleared existing image => signal server to delete it
        fd.append('remove_image', '1');
      }
    }

    // include id for edits (you said you use POST for edits)
    if (editingItemId.value) {
      fd.append('id', editingItemId.value);
    }

    // DUMP here so you can inspect what's going to be sent
    dumpFormData(fd);

    // emit FormData to parent; parent MUST send it as-is (no JSON, no manual Content-Type)
    emit('save', fd);
  } finally {
    isSubmitting.value = false;
  }
};

const closeModal = () => {
  clearSelectedFiles();
  existingImageCleared.value = false;
  emit('close');
};
</script>

<style scoped>
/* Fallback CSS to ensure filename and button text are black across browsers */
input[type="file"] {
  color: #000 !important;
}

/* WebKit-based browsers (Chrome, Safari) */
input[type="file"]::-webkit-file-upload-button {
  color: #000 !important;
  background: transparent;
  border: none;
  padding: 0;
}

/* Standard pseudo-element */
input[type="file"]::file-selector-button {
  color: #000 !important;
  background: transparent;
  border: none;
  padding: 0;
}
</style>
