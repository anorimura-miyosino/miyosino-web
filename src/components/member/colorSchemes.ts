export type ColorScheme = {
  bg: string;
  text: string;
  hover: string;
  borderStrong: string;
  borderSoft: string;
};

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    hover: 'hover:bg-purple-200',
    borderStrong: 'border-purple-600',
    borderSoft: 'border-purple-400',
  },
  {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    hover: 'hover:bg-blue-200',
    borderStrong: 'border-blue-600',
    borderSoft: 'border-blue-400',
  },
  {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    hover: 'hover:bg-teal-200',
    borderStrong: 'border-teal-600',
    borderSoft: 'border-teal-400',
  },
  {
    bg: 'bg-green-100',
    text: 'text-green-800',
    hover: 'hover:bg-green-200',
    borderStrong: 'border-green-600',
    borderSoft: 'border-green-400',
  },
  {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    hover: 'hover:bg-yellow-200',
    borderStrong: 'border-yellow-600',
    borderSoft: 'border-yellow-400',
  },
  {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    hover: 'hover:bg-orange-200',
    borderStrong: 'border-orange-600',
    borderSoft: 'border-orange-400',
  },
  {
    bg: 'bg-red-100',
    text: 'text-red-800',
    hover: 'hover:bg-red-200',
    borderStrong: 'border-red-600',
    borderSoft: 'border-red-400',
  },
  {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    hover: 'hover:bg-pink-200',
    borderStrong: 'border-pink-600',
    borderSoft: 'border-pink-400',
  },
];

export const DEFAULT_COLOR = COLOR_SCHEMES[0];

export const getCategoryColor = (
  category?: string,
  categoryColorMap?: Record<string, ColorScheme>
): ColorScheme => {
  if (category && categoryColorMap && categoryColorMap[category]) {
    return categoryColorMap[category];
  }
  return DEFAULT_COLOR;
};
