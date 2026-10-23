import { categories } from "@/data/categories";
import { collections } from "@/data/collections";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Footer link shown at the bottom of a dropdown. */
  allLink?: NavChild;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Natural Diamonds",
    href: "/natural-diamonds",
    children: categories.map((category) => ({
      label: category.label,
      href: `/natural-diamonds?category=${category.id}`,
      description: category.eyebrow,
    })),
    allLink: { label: "View all natural diamonds", href: "/natural-diamonds" },
  },
  {
    label: "Collections",
    href: "/collections",
    children: collections.map((collection) => ({
      label: collection.title,
      href: `/collections/${collection.slug}`,
      description: collection.eyebrow,
    })),
    allLink: { label: "View all collections", href: "/collections" },
  },
  { label: "Our Story", href: "/about" },
  {
    label: "Education",
    href: "/diamond-education",
    children: [
      { label: "The 4Cs of Diamond Quality", href: "/diamond-education#four-cs", description: "Cut, colour, clarity, carat" },
      { label: "Diamond Shapes", href: "/diamond-education#shapes", description: "Ten classic outlines" },
      { label: "How Natural Diamonds Form", href: "/diamond-education#formation", description: "Deep within the Earth" },
      { label: "Grading Reports", href: "/diamond-education#certification", description: "Reading a report" },
    ],
    allLink: { label: "Visit the education hub", href: "/diamond-education" },
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "Natural Diamonds", href: "/natural-diamonds" },
    { label: "Collections", href: "/collections" },
    { label: "Our Story", href: "/about" },
    { label: "Diamond Education", href: "/diamond-education" },
    { label: "Contact & Consultation", href: "/contact" },
  ],
  categories: categories.map((category) => ({
    label: category.label,
    href: `/natural-diamonds?category=${category.id}`,
  })),
  collections: collections.map((collection) => ({
    label: collection.title,
    href: `/collections/${collection.slug}`,
  })),
};
