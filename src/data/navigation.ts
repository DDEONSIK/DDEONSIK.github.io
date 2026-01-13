import { NavItem } from '@/types/Navigation';
import navigationJson from '@/data/navigation.json';

export const navigationData: NavItem[] = navigationJson as unknown as NavItem[];
