import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Seo from '@/components/Seo';
import Colophon from '@/components/editorial/Colophon';

const Ornament = () => (
  <div className="my-16 flex items-center justify-center gap-4" aria-hidden="true">
    <span className="h-px w-12 bg-border" />
    <span className="font-display text-gold text-xl leading-none">&sect;</span>
    <span className="h-px w-12 bg-border" />
  </div>
);

const NondualArticle = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(1, h.scrollTop / total) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Seo
        title="You've Already Known. You Just Didn't Have the Word for It. \u2014 Sovandarapor (James) Kong"
        description="Most people argue about God without ever defining it. Here's the real definition \u2014 and why you've already touched it without knowing."
        type="article"
      />

      {/* Reading progress hairline */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-px bg-transparent">
        <div
          className="h-full bg-gold transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* HERO — full screen, quiet */}
      <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Soft background gradient (warm beige in light, near-black in dark) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 35%, hsl(var(--bg-2)) 0%, hsl(var(--bg)) 70%)',
          }}
        />
        {/* Faint paper grain already on body; add a soft horizon line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-border opacity-40" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-10 py-24">
          <p className="eyebrow-gold">
            <Link to="/nondual" className="link-quiet">
              Nondual
            </Link>
          </p>
          <h1 className="font-display font-light text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-foreground tracking-[-0.015em]">
            You&rsquo;ve already known.
            <br />
            You just didn&rsquo;t have the word for it.
          </h1>
          <p className="font-content italic text-lg md:text-xl text-content-muted leading-[1.7] max-w-xl mx-auto">
            A quiet corner of the blog for the thing that keeps happening &mdash;
            and the old, sharp minds who already understood it.
          </p>
        </div>

        <a
          href="#read"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 font-ui text-[10px] uppercase tracking-[0.35em] text-content-muted hover:text-gold transition-colors duration-500"
        >
          Start here &darr;
        </a>
      </section>

      {/* ARTICLE BODY */}
      <article
        id="read"
        className="max-w-[38rem] mx-auto px-2 pt-24 md:pt-32 font-content text-foreground"
        style={{ fontSize: '19px', lineHeight: 1.8 }}
      >
        <p className="mb-7">I&rsquo;m going to tell you what God is.</p>
        <p className="mb-7">
          Not the version you were handed as a kid. Not the one you stopped
          believing in. Not the one people argue about on the internet.
        </p>
        <p className="mb-7">
          The real one. The one nobody bothers to actually define, so everyone
          walks around either defending or rejecting something they can&rsquo;t
          even describe.
        </p>
        <p className="mb-7">By the end of this page, you won&rsquo;t be searching anymore.</p>
        <p className="mb-7">Stay with me.</p>

        <Ornament />

        <p className="mb-7">First, the word.</p>
        <p className="mb-7">
          I know what happened when you read it up there. Something tightened.
          Either you&rsquo;re in, candles and prayer and all of it, or you
          checked out the second you saw it because you&rsquo;ve heard enough.
        </p>
        <p className="mb-7">I get it. The word carries a lot of luggage.</p>
        <p className="mb-7">But here&rsquo;s the thing nobody told us.</p>
        <p className="mb-7">
          The luggage isn&rsquo;t God. The luggage is the picture we were given
          of God. An old man on a throne. A judge keeping score. Something far
          away that you have to be good enough to reach.
        </p>
        <p className="mb-7">That picture was always going to fall apart. It was built to.</p>
        <p className="mb-7">Forget it. We&rsquo;re starting over.</p>

        <Ornament />

        <p className="mb-7">
          You&rsquo;re on the back of a moto in Phnom Penh. The city is doing
          its thing. A monk crosses the road in saffron like he has all the time
          in the world. A woman sells baguettes from a cart. A kid is asleep in
          a hammock between two trees like the noise doesn&rsquo;t reach him.
        </p>
        <p className="mb-7">
          And for one second, watching all of it blur past, something inside you
          goes quiet.
        </p>
        <p className="mb-7">Not peaceful. Still.</p>
        <p className="mb-7">
          Like you slipped below the surface of something, and down there, none
          of the noise reaches.
        </p>
        <p className="mb-7">
          You don&rsquo;t talk about it. There&rsquo;s no word for it in
          whatever conversation you were just having. So you wipe the dust off
          your face and Phnom Penh swallows you back up.
        </p>
        <p className="mb-7">But it keeps happening.</p>
        <p className="mb-7">
          At the riverfront when the sun drops over the Tonl&eacute; Sap. In a
          temple in Siem Reap, standing in front of a face carved into stone
          eight hundred years ago, feeling, somehow, like it&rsquo;s looking
          back. In a guesthouse upcountry, fan on, rain on the roof, everything
          suddenly simple and enough.
        </p>
        <p className="mb-7">Hold onto that feeling.</p>
        <p className="mb-7">We&rsquo;re going to find out what it is.</p>

        <Ornament />

        <p className="mb-7">Here&rsquo;s the definition.</p>
        <p className="mb-7">
          In the oldest Sanskrit texts, the word for God is Brahman. And it
          doesn&rsquo;t mean a person. It doesn&rsquo;t mean a being. It
          literally means <em>the vast</em>.
        </p>
        <p className="mb-7">That which has no limit.</p>
        <p className="mb-7">Now sit with that for a second, because most people skip past it.</p>
        <p className="mb-7">
          No limit means no limit. And there are only three ways anything in
          this world can be limited.
        </p>
        <p className="mb-7">Space. Time. Object.</p>
        <p className="mb-7">
          You&rsquo;re here, not there. You were born, you will die. You are
          you, not someone else.
        </p>
        <p className="mb-7">That&rsquo;s the cage every single thing lives inside. Including you.</p>
        <p className="mb-7">Now imagine something with no cage at all.</p>
        <p className="mb-7">
          No limit in space. There is nowhere it is not. Not in the temple. Not
          in the bar. Not in the worst hour of your worst night. Nowhere it is
          absent.
        </p>
        <p className="mb-7">
          No limit in time. There was never a moment before it. There will
          never be a moment after. It doesn&rsquo;t begin. It doesn&rsquo;t end.
        </p>
        <p className="mb-7">
          No limit in object. There is nothing in the universe separate from
          it. Not one thing. Not the monk. Not the moto driver. Not you reading
          this right now.
        </p>
        <p className="mb-7">One thing. Everywhere. Always. Nothing outside of it.</p>
        <p className="mb-7">That&rsquo;s the word God, stripped clean.</p>

        <Ornament />

        <p className="mb-7">Now here&rsquo;s where it stops being philosophy.</p>
        <p className="mb-7">
          Because if God really has no limit in space, then God has to be right
          here. Not in heaven. Not after you die. Not somewhere you have to earn
          your way to.
        </p>
        <p className="mb-7">Here. Now. In this.</p>
        <p className="mb-7">So let&rsquo;s actually look.</p>
        <p className="mb-7">
          Pick anything in front of you. Your hand. The wall. The cup of coffee
          gone cold.
        </p>
        <p className="mb-7">Now strip away the name. The shape. The color. The story.</p>
        <p className="mb-7">What&rsquo;s left?</p>
        <p className="mb-7">It exists.</p>
        <p className="mb-7">
          That quiet, stubborn, undeniable fact. <em>This is here.</em>
        </p>
        <p className="mb-7">
          Now look at something completely different. New object, new name, new
          everything.
        </p>
        <p className="mb-7">Same thing underneath. Same raw is-ness.</p>
        <p className="mb-7">
          The cup and the wall and your hand are all different on the surface.
          Different shapes, different names, different functions. But the
          existence inside them is not different. It&rsquo;s the same existence.
          One continuous ocean of it, and every object in the world is a wave
          in that ocean. Different shapes on top. Same water all the way down.
        </p>
        <p className="mb-7">
          The Tonl&eacute; Sap and the puddle from last night&rsquo;s rain are
          not having two different experiences of being wet.
        </p>
        <p className="mb-7">
          That ocean. That pure existence itself. That is what the old texts
          mean when they say God.
        </p>
        <p className="mb-7">You&rsquo;ve been swimming in it your whole life.</p>

        <Ornament />

        <p className="mb-7">
          And then it goes one layer deeper. This is the part that changes
          everything.
        </p>
        <p className="mb-7">The awareness you&rsquo;re using to read this right now.</p>
        <p className="mb-7">
          The thing noticing your thoughts without being the thoughts. The part
          of you that watches you worry, watches you laugh, watches you scroll.
          The thing that was there when you were seven years old and is somehow
          still here now, unchanged, watching.
        </p>
        <p className="mb-7">That&rsquo;s not yours.</p>
        <p className="mb-7">
          Every experience you&rsquo;ve ever had, every single one, happened
          inside consciousness. Consciousness is the one thing common to every
          experience you&rsquo;ve ever had. Without it, nothing is known.
          Nothing exists for you at all.
        </p>
        <p className="mb-7">
          And it has no edges. No location. No expiration date. Nothing apart
          from it.
        </p>
        <p className="mb-7">
          It&rsquo;s the same consciousness that looked out from the faces at
          Angkor Wat. The same one behind the eyes of the monk who rose at 4am
          this morning in Siem Reap. Behind every face in every century in
          every corner of the world.
        </p>
        <p className="mb-7">
          It was never born. It doesn&rsquo;t die. It just keeps looking.
        </p>
        <p className="mb-7">It&rsquo;s looking right now, through you.</p>

        <Ornament />

        <p className="mb-7">So that&rsquo;s the word. That&rsquo;s what I mean when I use it.</p>
        <p className="mb-7">
          Not a figure. Not a judge. Not a reward at the end of a long obedient
          life.
        </p>
        <p className="mb-7">
          Pure existence. Pure consciousness. The ground everything is standing
          on. The ocean every wave rises from. The awareness reading these
          words.
        </p>
        <p className="mb-7">And once you really sit with it, the whole thing flips.</p>
        <p className="mb-7">You&rsquo;re not a person searching for God.</p>
        <p className="mb-7">
          You&rsquo;re God, briefly, looking through a person. Forgetting.
          Remembering. Forgetting again.
        </p>

        <Ornament />

        <p className="mb-7">
          Somewhere in you, reading that, something just went quiet.
        </p>
        <p className="mb-7">Not confused. Not even convinced.</p>
        <p className="mb-7">
          Just still. Like you dropped below the surface of something again.
        </p>
        <p className="mb-7">You&rsquo;ve felt this before.</p>
        <p className="mb-7">That&rsquo;s where we start.</p>

        <Ornament />

        <p className="mb-7 font-display italic text-2xl md:text-3xl text-foreground leading-snug">
          Welcome to the nondual section.
        </p>
        <p className="mb-7 font-display italic text-xl text-content-muted">
          Glad you found it.
        </p>

        {/* Footer nav */}
        <div className="mt-24 pt-10 border-t border-border flex items-center justify-between font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
          <Link to="/nondual" className="link-quiet hover:text-gold">
            &larr; Back to Nondual
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="link-quiet hover:text-gold"
          >
            Back to top &uarr;
          </button>
        </div>
      </article>

      <Colophon />
    </>
  );
};

export default NondualArticle;
