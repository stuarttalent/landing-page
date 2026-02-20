import { PreRegisterForm } from "@/components/PreRegisterForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <span className="text-sm font-bold">CW</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">CWPS</p>
              <p className="text-xs text-slate-500">
                Center for Waste and Pathogen Safety
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
            <a className="hover:text-slate-900" href="#about">
              About
            </a>
            <a className="hover:text-slate-900" href="#who">
              Who Should Register
            </a>
            <a className="hover:text-slate-900" href="#pre-register">
              Pre-Registration
            </a>
          </nav>

          <a
            href="#pre-register"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200"
          >
            Pre-Register
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(16,185,129,0.22),transparent_50%),radial-gradient(900px_circle_at_90%_10%,rgba(56,189,248,0.18),transparent_45%)]" />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Powered by the Center for Waste and Pathogen Safety
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Pre-Register for the CWPS Medical Waste Compliance Program
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                A centralized compliance, documentation, and training platform
                designed for healthcare facilities.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#pre-register"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200"
                >
                  Pre-Register Your Facility
                </a>
                <a
                  href="#about"
                  className="inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 focus:ring-4 focus:ring-slate-200"
                >
                  Learn what’s included
                </a>
              </div>

              <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Reduce risk",
                    value: "Prevent compliance-related shutdowns",
                  },
                  {
                    label: "Centralize",
                    value: "Documentation & audit readiness",
                  },
                  {
                    label: "Train",
                    value: "Certified training & inspections readiness",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border bg-white/70 p-4 shadow-sm"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-slate-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold text-slate-900">
                  Early access pre-registration
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Share your details and we’ll reach out with next steps.
                </p>
                <div className="mt-6">
                  <a
                    href="#pre-register"
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:ring-4 focus:ring-slate-200"
                  >
                    Go to form
                  </a>
                </div>
                <div className="mt-5 rounded-2xl border bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-700">
                    What you’ll get
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-600" />
                      Program updates and launch timeline
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-600" />
                      Facility onboarding guidance
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-600" />
                      Compliance + training readiness resources
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                About the Program
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                CWPS is building a purpose-designed platform to help healthcare
                facilities manage medical waste compliance with confidence. Keep
                policies, logs, training, and readiness workflows in one place—
                so your team stays prepared and your facility stays operational.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Prevent compliance-related shutdowns",
                    body: "Track documentation requirements and stay ahead of critical deadlines.",
                  },
                  {
                    title: "Centralized document management",
                    body: "Store and retrieve key compliance records quickly—when it matters most.",
                  },
                  {
                    title: "Certified training & inspections readiness",
                    body: "Support staff training and build consistent readiness habits across teams.",
                  },
                  {
                    title: "Designed for healthcare facilities",
                    body: "Workflows reflect real facility operations: clinics, labs, pharmacies, and hospitals.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-3xl border bg-white p-6 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {c.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="who" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="rounded-3xl border bg-white px-6 py-10 shadow-sm sm:px-10">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Who Should Register
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                If you generate, handle, or store regulated medical waste, this
                program is designed for you.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Clinics",
                "Hospitals",
                "Laboratories",
                "Pharmacies",
                "Diagnostic centers",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="pre-register"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-14 sm:px-6"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Pre-Registration Form
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Provide your facility details to join the early access list. No
                account is required for this version.
              </p>
              <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Submission details
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your submission is sent securely to the CWPS team by email. We
                  don’t store these entries in a database for this pre-launch
                  phase.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
                <PreRegisterForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600 sm:px-6">
          <p className="font-medium text-slate-900">
            Powered by Center for Waste and Pathogen Safety
          </p>
          <p className="mt-2 max-w-3xl text-slate-600">
            CWPS is developing a centralized compliance, documentation, and
            training platform designed for healthcare facilities.
          </p>
        </div>
      </footer>
    </div>
  );
}
