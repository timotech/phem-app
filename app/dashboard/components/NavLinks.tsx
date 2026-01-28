"use client";

import * as HeroIcons from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

// Map of links to display in the side navigation.
const links = [
  { name: "Dashboard", href: "/dashboard", icon: HeroIcons.ChartBarIcon },
  {
    name: "Upload Course Info",
    href: "/dashboard/courses",
    icon: HeroIcons.TruckIcon,
  },
  {
    name: "About Us",
    href: "/dashboard/about",
    icon: HeroIcons.AdjustmentsVerticalIcon,
  },
  {
    name: "FAQ",
    href: "/dashboard/faqs",
    icon: HeroIcons.BuildingLibraryIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: HeroIcons.Cog6ToothIcon,
    subLinks: [
      { name: "Users", href: "/dashboard/users", icon: HeroIcons.UserIcon },
      {
        name: "Roles",
        href: "/dashboard/roles",
        icon: HeroIcons.UserGroupIcon,
      },
      // {
      //   name: "Permissions",
      //   href: "/dashboard/permissions",
      //   icon: HeroIcons.UserPlusIcon,
      // },
    ],
  },
];

export default function NavLinks({
  showTextMobile = false,
}: {
  showTextMobile?: boolean;
}) {
  const pathname = usePathname();
  const [expandedLink, setExpandedLink] = useState<string | null>(null);

  const toggleExpand = (linkName: string) => {
    setExpandedLink(expandedLink === linkName ? null : linkName);
  };

  return (
    <div className="overflow-y-scroll h-96">
      <h2 className="text-sm font-bold text-green-600 my-2">Home Menus</h2>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        const isExpanded = expandedLink === link.name;

        return (
          <div key={link.name}>
            {/* Parent Link */}
            <Link
              href={link.href}
              onClick={(e) => {
                if (link.subLinks && link.subLinks.length > 0) {
                  e.preventDefault(); // Prevent redirection if the link has sub-links
                  toggleExpand(link.name);
                }
              }}
              className={clsx(
                "flex h-[48px] grow items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer",
                {
                  "bg-sky-100 text-green-600": isActive || isExpanded,
                },
              )}
            >
              <div className="flex items-center gap-2">
                <LinkIcon className="w-6" />
                <p
                  className={clsx(
                    showTextMobile ? "block md:block" : "hidden md:block",
                  )}
                >
                  {link.name}
                </p>
              </div>
              {link.subLinks && link.subLinks.length > 0 && (
                <HeroIcons.ChevronDownIcon
                  className={clsx("w-4 transition-transform", {
                    "rotate-180": isExpanded,
                  })}
                />
              )}
            </Link>

            {/* Render sub-links if expanded */}
            {isExpanded && link.subLinks && (
              <div className="pl-6 mt-2 space-y-1">
                {link.subLinks.map((subLink) => {
                  const SubLinkIcon = subLink.icon; // Directly use the sub-link icon
                  return (
                    <Link
                      key={subLink.name}
                      href={subLink.href}
                      className={clsx(
                        "flex h-[40px] grow items-center gap-2 rounded-md bg-gray-100 p-2 text-sm font-medium hover:bg-sky-100 hover:text-green-600",
                        {
                          "bg-sky-100 text-green-600":
                            pathname === subLink.href,
                        },
                      )}
                    >
                      {/* Render the sub-link icon */}
                      {SubLinkIcon && <SubLinkIcon className="w-6" />}
                      <p
                        className={clsx(
                          showTextMobile ? "block md:block" : "hidden md:block",
                        )}
                      >
                        {subLink.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
