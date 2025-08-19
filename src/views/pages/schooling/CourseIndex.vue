
    <template>

        <!-- Navigation -->
         <CourseNavBar/>
     

        <!-- Hero Section -->
        <HeroSection/>

        <!-- Progress Indicator -->
        <div class="sticky top-16 z-40 bg-white shadow-sm">
            <div class="h-1 w-full bg-gray-200">
                <div class="h-full bg-blue-600 progress-bar" :style="{width: progress + '%'}"></div>
            </div>
        </div>

        <!-- What You'll Learn Section -->
       <WhatYouLearn/>

        <!-- Course Content Section -->
        <CourseContent/>

        <!-- Certificate Section -->
         <CertificateSection/>

        <!-- Testimonials Section -->
         <TestimonialSection/>

        <!-- CTA Section -->
        <CTAsection/>

        <!-- Footer -->
         <SchoolingFooter/>

        <!-- Enrollment Modal -->
        <EnrollmentModal/>

        <!-- Video Modal -->
        <VideoModal/>

        <!-- Success Toast -->
       <SuccessToast/>
</template>
   <script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import CourseNavBar from '@/components/CourseNavBar.vue';
    import HeroSection from './HeroSection.vue';
    import WhatYouLearn from './WhatYouLearn.vue';
    import CourseContent from './CourseContent.vue';
    import CertificateSection from './CertificateSection.vue';
    import TestimonialSection from './TestimonialSection.vue';
    import CTAsection from './CTAsection.vue';
    import SchoolingFooter from './SchoolingFooter.vue';
    import EnrollmentModal from '@/components/Modals/EnrollmentModal.vue';
    import VideoModal from '@/components/Modals/VideoModal.vue';
    import SuccessToast from '@/components/Modals/SuccessToast.vue';



    const mobileMenuOpen = ref(false);
    const showModal = ref(false);
    const showVideoModal = ref(false);
    const showSuccessToast = ref(false);
    const progress = ref(0);
    
    const form = ref({
        name: '',
        email: '',
        phone: '',
        experience: '',
        agree: false
    });
    
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        const totalScrollable = documentHeight - windowHeight;
        const scrollPercentage = (scrollPosition / totalScrollable) * 100;
        
        progress.value = Math.min(100, Math.max(0, scrollPercentage));
    };
    
    const scrollTo = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
    
    const submitEnrollment = () => {
        // In a real app, you would send this data to your backend
        console.log('Enrollment submitted:', form.value);
        
        // Reset form
        form.value = {
            name: '',
            email: '',
            phone: '',
            experience: '',
            agree: false
        };
        
        // Show success message
        showSuccessToast.value = true;
        showModal.value = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            showSuccessToast.value = false;
        }, 5000);
    };
    
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });
    
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>