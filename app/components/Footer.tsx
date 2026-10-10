import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#FCFAF7] border-t border-[#F0EAE1] text-[#6B6264] text-sm" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Info */}
          <div className="space-y-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Sweet Wishes - Handcrafted Cakes"
                width={150}
                height={60}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed">
              Handcrafted custom cakes made fresh for every celebration. Baked with love and fine quality ingredients.
            </p>
          </div>

          {/* Orders & Pickup */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-[#2A2426] uppercase tracking-wider">
              Order Details
            </h2>
            <p className="leading-relaxed">
              Custom Orders Only<br />
              Pickup & Local Delivery Available<br />
              <span className="text-xs text-[#A37078]">Pre-orders recommended</span>
            </p>
          </div>

          {/* Get in Touch & Location */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-[#2A2426] uppercase tracking-wider">
              Get in Touch
            </h2>
            <ul className="space-y-2.5">
              {/* Phone */}
              <li>
                <a
                  href="tel:+94716091425"
                  className="inline-flex items-center gap-2.5 hover:text-[#D48B90] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>+94 71 609 1425</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:sweetwishes.lk@gmail.com"
                  className="inline-flex items-center gap-2.5 hover:text-[#D48B90] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>sweetwishes.lk@gmail.com</span>
                </a>
              </li>

              {/* Shop Address */}
              <li className="pt-1">
                <a
                  href="https://maps.google.com/?q=86/C1,+Ranjula,+Wallabada,+Madampagama,+Ambalangoda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 hover:text-[#D48B90] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current shrink-0 mt-0.5" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <address className="not-italic leading-relaxed text-xs sm:text-sm">
                    86/C1, Ranjula<br />
                    Wallabada, Madampagama, Ambalangoda
                  </address>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-[#2A2426] uppercase tracking-wider">
              Follow Along
            </h2>
            <p className="text-xs leading-relaxed">
              Connect with us on social media for our latest cake designs & updates:
            </p>
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1EyP2oAbSq/?mibextid=wwXIfr"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white border border-[#E0D8CC] text-[#2A2426] hover:text-[#D48B90] hover:border-[#D48B90] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.2 1.2 16.2 1 15 1c-3.2 0-5 1.9-5 5.4V9H7v4h3v8h4Z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@_sweet_wishes_?_r=1&_t=ZS-99tQ8fJIQwW"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white border border-[#E0D8CC] text-[#2A2426] hover:text-[#D48B90] hover:border-[#D48B90] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.54-1.3 2.54.02.99.58 1.91 1.42 2.42.87.53 1.97.57 2.86.11.83-.42 1.42-1.25 1.51-2.18.04-1.57.02-3.14.02-4.71V.02z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/94716091425"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white border border-[#E0D8CC] text-[#2A2426] hover:text-[#D48B90] hover:border-[#D48B90] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 py-5 md:py-8 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A37078] gap-2 md:gap-4">
          <span>© {currentYear} Sweet Wishes. All rights reserved.</span>
          <span>Baked fresh, shared with love.</span>
        </div>
      </div>
    </footer>
  );
}