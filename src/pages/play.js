import React from 'react';
import Layout from '@/Components/Layout';
import AnimatedText from '@/Components/AnimatedText';
import BugBlaster from '@/Components/BugBlaster';
import Seo from '@/Components/Seo';

const Play = () => (
  <>
    <Seo
      title="Bug Blaster"
      description="Take a break with Bug Blaster: a fast arcade shooter where you blast waves of bugs before they ship to production."
    />
    <main className="flex w-full flex-col items-center justify-center">
      <Layout className="pt-12 sm:pt-16">
        <AnimatedText text="Take a Break!" className="mb-6 md:mb-8" />
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg font-medium text-dark/75 md:mb-14">
          Every engineer knows the feeling: the bugs keep coming. Here, at least, you get to blast them.
        </p>
        <div className="mx-auto w-full max-w-4xl">
          <BugBlaster />
        </div>
      </Layout>
    </main>
  </>
);

export default Play;
