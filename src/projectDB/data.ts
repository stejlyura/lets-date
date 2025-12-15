import type { userData } from "../types/type-user";

import Anna from '@/assets/img/Anna.webp'
import Alla from '@/assets/img/Alla.jpg'
import Anfa from '@/assets/img/Anfa.jpg'
import Lee from '@/assets/img/Lee.jpg'

export const projectBD: userData[] = [
    {data_id: 1, fname: 'Anna', age: 20, isLike: true, mainImg: Anna, isActive: true, range: 20  },
    {data_id: 2, fname: 'Alla', age: 26, isLike: true, mainImg: Alla, isActive: true, range: 220    },
    {data_id: 3, fname: 'Anfa', age: 22, isLike: true, mainImg: Anfa, isActive: false, range: 54    },
    {data_id: 4, fname: 'Lee', age: 20, isLike: true, mainImg: Lee, isActive: true, range: 1109    },
]