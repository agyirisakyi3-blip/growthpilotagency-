import { ArrowUpRight, Mail, Phone, MapPin, Smartphone, CreditCard, Building2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const p = useTranslations("payment");

  const serviceLinks = [
    { label: t("serviceLinks.seo"), href: "/services/seo-services" },
    { label: t("serviceLinks.website"), href: "/services/website-design" },
    { label: t("serviceLinks.ai"), href: "/services/ai-automation" },
    { label: t("serviceLinks.whatsapp"), href: "/services/whatsapp-automation" },
    { label: t("serviceLinks.leads"), href: "/services/lead-generation" },
    { label: t("serviceLinks.localSeo"), href: "/services/local-seo" },
    { label: t("serviceLinks.sms"), href: "/services/sms-automation" },
    { label: t("serviceLinks.social"), href: "/services/social-media-management" },
    { label: t("serviceLinks.ads"), href: "/services/google-ads-ppc" },
    { label: t("serviceLinks.socialAds"), href: "/services/social-media-ads" },
    { label: t("serviceLinks.content"), href: "/services/content-creation" },
    { label: t("serviceLinks.ecommerce"), href: "/services/ecommerce-solutions" },
    { label: t("serviceLinks.crm"), href: "/services/crm-setup-automation" },
    { label: t("serviceLinks.reputation"), href: "/services/reputation-management" },
    { label: t("serviceLinks.maintenance"), href: "/services/maintenance-support" },
  ];

  const companyLinks = [
    { label: t("companyLinks.about"), href: "/#about" },
    { label: t("companyLinks.team"), href: "/team" },
    { label: t("companyLinks.pricing"), href: "/pricing" },
    { label: t("companyLinks.caseStudies"), href: "/case-studies" },
    { label: t("companyLinks.blog"), href: "/blog" },
    { label: t("companyLinks.contact"), href: "/contact" },
  ];

  const industryLinks = [
    { label: t("industryLinks.law"), href: "/#industries" },
    { label: t("industryLinks.insurance"), href: "/#industries" },
    { label: t("industryLinks.ngos"), href: "/#industries" },
    { label: t("industryLinks.realEstate"), href: "/#industries" },
    { label: t("industryLinks.healthcare"), href: "/#industries" },
    { label: t("industryLinks.hotels"), href: "/#industries" },
  ];

  return (
    <footer className="bg-[#0a0f1e] border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-lg"
              aria-label="GrowthPilot Agency - Home"
            >
              <Logo />
              <span className="font-semibold text-lg text-white">
                GrowthPilot<span className="text-[#3b82f6]">Agency</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              {t("description")}
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <a
                href="mailto:agyirisakyi3@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded"
              >
                <Mail size={14} aria-hidden="true" />
                agyirisakyi3@gmail.com
              </a>
              <a
                href="tel:+2250141317315"
                className="flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded"
              >
                <Phone size={14} aria-hidden="true" />
                0141317315
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" />
                Yopougon, Abidjan
              </span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://x.com/GrowthPilotAgency"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://facebook.com/GrowthPilotAgency"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://instagram.com/GrowthPilotAgency"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://linkedin.com/company/GrowthPilotAgency"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white mb-4">{t("services")}</h4>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white mb-4">{t("company")}</h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white mb-4">{t("industries")}</h4>
            <ul className="flex flex-col gap-2">
              {industryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white mb-4">{p("title")}</h4>
            <ul className="flex flex-col gap-2 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <Smartphone size={14} className="text-[#3b82f6] shrink-0" />
                {p("mobileMoney")}
              </li>
              <li className="flex items-center gap-2">
                <CreditCard size={14} className="text-[#3b82f6] shrink-0" />
                {p("card")}
              </li>
              <li className="flex items-center gap-2">
                <Building2 size={14} className="text-[#3b82f6] shrink-0" />
                {p("bank")}
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/[0.06]" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>
            &copy; {new Date().getFullYear()} GrowthPilot Agency. {t("allRightsReserved")}
          </p>
          <nav className="flex items-center gap-4" aria-label="Legal links">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded"
            >
              {t("termsOfService")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
