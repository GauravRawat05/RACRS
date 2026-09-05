import { OnboardingProvider } from '@/context/OnboardingContext';
import OnboardingWizard from '@/components/OnboardingWizard';

export default function Home() {
  return (
    <OnboardingProvider>
      <main className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-4">
        <OnboardingWizard />
      </main>
    </OnboardingProvider>
  );
}
