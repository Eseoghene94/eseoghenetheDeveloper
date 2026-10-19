import React from 'react';
import Layout from '@/Components/Layout';
import AnimatedText from '@/Components/AnimatedText';
import BubbleWrap from '@/Components/BubbleWrap';
import Seo from '@/Components/Seo';

// A small, calm break: bubble wrap plus a breathing guide.
const Play = () => (
  <>
    <Seo
      title="Take a Breather"
      description="A calm little bubble-wrap game for a two-minute break. Pop, squash a few hidden bugs, and breathe."
    />
    <main className="flex w-full flex-col items-center justify-center">
      <Layout className="pt-12 sm:pt-16">
        <AnimatedText text="Take a Breather" className="mb-6 md:mb-8" />
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg font-medium text-dark/75 md:mb-16">
          Engineering is a long game. Pop some bubbles, squash the odd bug, and follow the circle: breathe in as it
          grows, out as it shrinks.
        </p>

        <div className="grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <BubbleWrap />

          {/* Breathing guide: 4s in, 4s out. Static (with plain instructions) when motion is reduced. */}
          <aside aria-label="Breathing guide" className="flex flex-col items-center gap-6 lg:sticky lg:top-32">
            <div className="relative flex h-48 w-48 items-center justify-center">
              <span className="breathe absolute inset-0 rounded-full bg-primary/15" aria-hidden="true" />
              <span className="breathe absolute inset-6 rounded-full border-2 border-solid border-primary/50" aria-hidden="true" />
              <span className="relative font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Breathe</span>
            </div>
            <p className="text-center text-sm font-medium text-dark/60">In for four seconds, out for four. Repeat a few times.</p>
          </aside>
        </div>
      </Layout>
    </main>
  </>
);

export default Play;
