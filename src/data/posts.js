/**
 * Placeholder post data. Swap this for a fetch from your MERN API
 * (e.g. GET /api/posts) once the blog backend is wired up - Blog.jsx
 * and BlogPost.jsx don't need to change, just replace `posts` with
 * state populated from that request.
 *
 * Only 4 real posts exist right now, so the set is duplicated once to
 * give the Blog grid (8 cards) and the Related-articles section (needs
 * up to 4 excluding the current post) enough posts to work with -
 * slugs on the duplicates get a "-2" suffix so React keys and
 * /blog/:slug links stay unique.
 *
 * All 4 posts now have full-length `body` content (lead + paragraphs +
 * an inline image + two h2 sections + a newsletter panel), matching
 * the depth of the original reference article - swap in real copy (or
 * the API response) whenever the backend is ready.
 */
export const basePosts = [
  {
    date: "Jun 24, 2026",
    tag: "Design",
    title: "What Makes A Website Project Run Smoothly",
    excerpt: "A simple look at how clear structure, focused feedback, and the right process.",
    slug: "what-makes-a-website-project-run-smoothly",
    ratio: "1 / 1",
    image:
      "https://framerusercontent.com/images/lwpit2bNgoGUzyqkdPw3jyiPI.webp?width=1800&height=1800",
    hero:
      "https://framerusercontent.com/images/lwpit2bNgoGUzyqkdPw3jyiPI.webp?width=1800&height=1800",
    readTime: "10 min",
    body: [
      {
        type: "lead",
        text: "A smooth website project is not only about good design. It is shaped by clear decisions, focused communication, and a process that keeps everyone moving in the same direction.",
      },
      {
        type: "paragraph",
        text: "A smooth website project starts long before the first layout is designed. It begins with understanding the purpose of the website, the audience it needs to speak to, and the message it should communicate. When these things are clear from the beginning, every decision becomes easier, from the structure of the pages to the final visual details.",
      },
      {
        type: "paragraph",
        text: "Without a clear direction, a project can quickly become scattered. New ideas appear, priorities shift, and the website starts trying to do too many things at once. A focused direction keeps the project grounded and makes sure every section has a reason to exist.",
      },
      {
        type: "paragraph",
        text: "The goal is not to plan every detail perfectly before starting. The goal is to create enough clarity so the design can move forward with confidence. A strong foundation gives the project rhythm and helps the final website feel intentional instead of improvised.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/0UkNZE7S4qruVsivS70eDa2fsHk.webp?width=1800&height=2400",
        alt: "Close-up of a flower in soft light",
      },
      { type: "h2", text: "Focused Communication" },
      {
        type: "paragraph",
        text: "Good communication is one of the most important parts of a smooth website project. It keeps the process moving, reduces confusion, and helps everyone understand what is happening at each stage. When feedback is clear and decisions are made at the right time, the project feels much easier from start to finish.",
      },
      {
        type: "paragraph",
        text: "Feedback works best when it is specific and connected to the goals of the website. Instead of only reacting to how something looks, it helps to think about whether the design supports the message, guides the visitor, and feels aligned with the brand. This turns feedback into a useful part of the process rather than a source of delay.",
      },
      {
        type: "paragraph",
        text: "A smooth process also depends on trust. The designer needs space to shape the direction, while the client needs to feel informed and involved. When both sides communicate openly and stay focused on the same goal, the process becomes more collaborative and much more enjoyable.",
      },
      { type: "newsletter" },
      { type: "h2", text: "A Clean Path To Launch" },
      {
        type: "paragraph",
        text: "The final phase of a website project is where structure, design, and development come together. A website needs to look good, but it also needs to work well across screen sizes, load properly, and feel easy to use. Thinking about launch early helps avoid unnecessary problems at the end.",
      },
      {
        type: "paragraph",
        text: "This is especially important when building in Framer. Clean layouts, responsive sections, reusable components, and organized content make the website easier to manage after it goes live. A smooth launch is not only about publishing the site, but also making sure it can grow and change over time.",
      },
      {
        type: "paragraph",
        text: "In the end, a website project runs smoothly when every step has a clear purpose. Direction, communication, feedback, design, development, and launch all need to support each other. When the process is structured but flexible, the final website feels more polished, more useful, and easier to bring into the world.",
      },
    ],
  },
  {
    date: "May 30, 2026",
    tag: "Design",
    title: "How Visual Direction Shapes A Stronger Website",
    excerpt: "Why typography, imagery, spacing, and color direction matter.",
    slug: "how-visual-direction-shapes-a-stronger-website",
    ratio: "0.75 / 1",
    image:
      "https://framerusercontent.com/images/0UkNZE7S4qruVsivS70eDa2fsHk.webp?width=1800&height=2400",
    hero:
      "https://framerusercontent.com/images/0UkNZE7S4qruVsivS70eDa2fsHk.webp?width=1800&height=2400",
    readTime: "7 min",
    body: [
      {
        type: "lead",
        text: "Visual direction is what turns a functional website into one that feels considered. It is the layer that shapes how every other decision gets made, from the first sketch to the final pixel.",
      },
      {
        type: "paragraph",
        text: "Typography, imagery, spacing, and color don't just decorate a website - they carry meaning. A clear visual direction set early keeps every later decision consistent, instead of each page drifting into its own style as more people touch the project.",
      },
      {
        type: "paragraph",
        text: "Typography is often the first thing a visitor notices, even if they never consciously register it. The right typeface, paired with careful sizing and spacing, sets the tone for everything else on the page before a single word is read.",
      },
      {
        type: "paragraph",
        text: "Imagery works the same way. Photography, illustration, and iconography all send a signal about who a brand is and who it's speaking to. Mismatched imagery can undo months of careful messaging in a single scroll.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/XKNn5wdz0oZLzNZE43UWd43s3x0.webp?width=1800&height=1800",
        alt: "Runner captured mid-stride under red light",
      },
      { type: "h2", text: "Spacing Does The Heavy Lifting" },
      {
        type: "paragraph",
        text: "Spacing is the most underrated tool in visual direction. Generous, consistent spacing gives content room to breathe and helps a visitor's eye move through a page the way it was designed to. Cramped layouts feel rushed, no matter how good the individual pieces are.",
      },
      {
        type: "paragraph",
        text: "A spacing system - not just spacing chosen case by case - is what keeps a site feeling coherent as it grows. Once that rhythm is set, new sections slot in without needing to be redesigned from scratch.",
      },
      {
        type: "paragraph",
        text: "Color direction closes the loop. A small, intentional palette used consistently across a site does more for brand recognition than a wide palette used inconsistently ever could.",
      },
      { type: "newsletter" },
      { type: "h2", text: "Treat It As A System" },
      {
        type: "paragraph",
        text: "The strongest websites treat visual direction as a system, not a set of one-off choices. Once that system is defined - type scale, spacing units, color roles, image treatment - building new pages becomes faster and the whole site feels like it belongs together.",
      },
      {
        type: "paragraph",
        text: "That system doesn't need to be complicated. A short set of rules, applied consistently, will outperform an elaborate style guide that nobody actually follows.",
      },
      {
        type: "paragraph",
        text: "In the end, strong visual direction is felt more than it's noticed. Visitors won't point to the typography or the spacing, but they'll trust the site more because of it - and that trust is what turns a visit into a conversion.",
      },
    ],
  },
  {
    date: "Apr 7, 2026",
    tag: "Development",
    title: "Building Better Websites In Framer",
    excerpt: "A practical look at responsive layouts, clean components & the CMS structure.",
    slug: "building-better-websites-in-framer",
    ratio: "1 / 1",
    image:
      "https://framerusercontent.com/images/XKNn5wdz0oZLzNZE43UWd43s3x0.webp?width=1800&height=1800",
    hero:
      "https://framerusercontent.com/images/XKNn5wdz0oZLzNZE43UWd43s3x0.webp?width=1800&height=1800",
    readTime: "9 min",
    body: [
      {
        type: "lead",
        text: "Building well in Framer comes down to the same fundamentals as any good build: clean structure, reusable pieces, and a CMS that won't fight you later.",
      },
      {
        type: "paragraph",
        text: "Responsive layouts should be planned from the smallest breakpoint up, not patched in afterward. Designing mobile-first forces the important decisions early, and everything larger than that becomes a matter of adding room rather than solving new problems.",
      },
      {
        type: "paragraph",
        text: "Breakpoints work best when they're tied to the content, not to arbitrary device widths. A layout should change when the content actually needs it to - a heading wrapping awkwardly, a card grid feeling cramped - rather than at a fixed number picked in advance.",
      },
      {
        type: "paragraph",
        text: "Components built to be reused save real time once a site grows past a handful of pages. A button, a card, a section header - each one built once and reused everywhere means a single update propagates across the entire site instead of needing to be repeated by hand.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/P6MzQfBdpMKaZclGPIFk31ogUus.webp?width=1800&height=2400",
        alt: "Close-up portrait with dramatic side lighting",
      },
      { type: "h2", text: "A CMS Structure That Scales" },
      {
        type: "paragraph",
        text: "A well-structured CMS is what makes a site easy to maintain long after launch. Naming fields clearly and keeping collections focused pays off every time content needs to change - which, for most sites, is constantly.",
      },
      {
        type: "paragraph",
        text: "It helps to think about the CMS from the content editor's point of view, not just the developer's. A field labeled clearly, with a helpful description, saves a support message six months later when someone new is updating the site.",
      },
      {
        type: "paragraph",
        text: "Relationships between collections - a blog post linked to an author, a project linked to a set of services - should mirror how the content is actually used, not just how it's stored. That alignment is what keeps a CMS pleasant to work in as it grows.",
      },
      { type: "newsletter" },
      { type: "h2", text: "Performance Isn't An Afterthought" },
      {
        type: "paragraph",
        text: "A responsive layout and a clean CMS don't matter much if the site is slow to load. Image sizes, font loading strategy, and how much runs on page load all shape how a site actually feels to use, not just how it looks in a mockup.",
      },
      {
        type: "paragraph",
        text: "Framer handles a lot of this automatically, but it still rewards intentional choices - keeping components lean, avoiding unnecessary animation on first load, and testing on a real connection rather than assuming everyone has fiber.",
      },
      {
        type: "paragraph",
        text: "In the end, a better Framer build isn't about using every feature available. It's about making deliberate choices - in layout, components, content structure, and performance - that add up to a site that's genuinely easier to build, maintain, and grow.",
      },
    ],
  },
  {
    date: "Mar 23, 2026",
    tag: "Branding",
    title: "Creating A Digital Presence That Feels Clear",
    excerpt: "How strong messaging, consistent visuals, and a focused website experience.",
    slug: "creating-a-digital-presence-that-feels-clear",
    ratio: "0.75 / 1",
    image:
      "https://framerusercontent.com/images/P6MzQfBdpMKaZclGPIFk31ogUus.webp?width=1800&height=2400",
    hero:
      "https://framerusercontent.com/images/P6MzQfBdpMKaZclGPIFk31ogUus.webp?width=1800&height=2400",
    readTime: "6 min",
    body: [
      {
        type: "lead",
        text: "A clear digital presence comes from messaging, visuals, and experience all pointing in the same direction - not from any single element working alone.",
      },
      {
        type: "paragraph",
        text: "Strong messaging tells visitors what a brand does and why it matters within seconds. Most visitors decide whether to keep reading long before they've absorbed every word on a page, so the first line has to do real work.",
      },
      {
        type: "paragraph",
        text: "That first line only works if everything after it backs it up. A bold headline followed by vague or generic supporting copy undoes the trust it just built - clarity has to hold all the way down the page, not just at the top.",
      },
      {
        type: "paragraph",
        text: "Consistent visuals build recognition and trust the longer someone spends on a site. A visitor shouldn't have to wonder, page to page, whether they're still looking at the same brand.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/lwpit2bNgoGUzyqkdPw3jyiPI.webp?width=1800&height=1800",
        alt: "Hand reaching forward against a soft, colorful backdrop",
      },
      { type: "h2", text: "One Story, Told Consistently" },
      {
        type: "paragraph",
        text: "A focused website experience ties both together - every page should reinforce the same story instead of introducing a new one. A pricing page and a homepage can look different, but they should never feel like they belong to two different brands.",
      },
      {
        type: "paragraph",
        text: "This is where a lot of digital presences quietly fall apart. Each page gets built to solve its own problem, and over time the site accumulates small inconsistencies that, individually, seem harmless but together erode trust.",
      },
      {
        type: "paragraph",
        text: "The fix isn't more rules - it's fewer, clearer ones. A short, well-understood set of guidelines for voice, imagery, and layout will hold up better over time than an exhaustive brand book nobody has time to reference.",
      },
      { type: "newsletter" },
      { type: "h2", text: "Clarity Is A Competitive Advantage" },
      {
        type: "paragraph",
        text: "In a crowded market, clarity is one of the few advantages that's fully within a brand's control. Competitors can match features and pricing, but a genuinely clear, consistent presence is much harder to copy.",
      },
      {
        type: "paragraph",
        text: "That clarity compounds. Every piece of content built on a clear foundation reinforces the ones before it, while content built on a shifting foundation has to work harder just to hold attention.",
      },
      {
        type: "paragraph",
        text: "In the end, a clear digital presence isn't the result of one clever campaign or one great page - it's the result of messaging, visuals, and experience staying aligned, consistently, across everything a brand puts out into the world.",
      },
    ],
  },
];

export const posts = [
  ...basePosts,
  ...basePosts.map((p) => ({ ...p, slug: `${p.slug}-2` })),
];