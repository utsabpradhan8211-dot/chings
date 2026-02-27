const uploadSteps = [
  'Add image files into public/assets/ai-uploads/',
  'Commit the new files to your branch.',
  'Push to GitHub so the dashboard can serve them instantly.',
];

export default function AssetsPanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <article className="glass rounded-2xl p-5">
        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">Asset hub</p>
        <h2 className="mt-1 text-lg font-semibold">AI photo uploads via GitHub</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Use the new repository folder <code>public/assets/ai-uploads</code> to store generated campaign
          visuals. Anything committed there can be referenced in the dashboard with
          <code> /assets/ai-uploads/&lt;file-name&gt;</code>.
        </p>

        <ol className="mt-4 space-y-2 text-sm">
          {uploadSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-xl bg-slate-100/80 px-3 py-2 dark:bg-white/5"
            >
              <span className="mr-2 font-semibold text-brand-pink">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </article>

      <article className="glass rounded-2xl p-5">
        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">Example path</p>
        <h3 className="mt-1 text-base font-semibold">How to reference uploaded files</h3>
        <div className="mt-3 rounded-xl bg-slate-100/80 p-3 text-xs dark:bg-white/5">
          <p className="font-mono text-brand-pink">/assets/ai-uploads/summer-bibimbap.jpg</p>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Add this URL to product cards, promos, or campaign tiles after the image is pushed to GitHub.
          </p>
        </div>
      </article>
    </section>
  );
}
