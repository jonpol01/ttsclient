

import { recipe } from '@vanilla-extract/recipes'


export const BasicLabel = recipe({
    base: {
        fontWeight: "700",
    },
    variants: {
        paddingLeft: {
            "0rem": {
                paddingLeft: "0rem"
            },
            "1rem": {
                paddingLeft: "1rem"
            },
            "2rem": {
                paddingLeft: "2rem"
            }
        },
        width: {
            small: {
                width: '4rem',
            },
            medium: {
                width: '6rem',
            },
            large: {
                width: '8rem',
            },
            large2: {
                width: '10rem',
            },
            large3: {
                width: '12rem',
            },
            large4: {
                width: '14rem',
            },
            large5: {
                width: '16rem',
            },
            "x-large": {
                width: '20rem',
            },
            "max": {
                width: '100%',
            }
        },
    },

    defaultVariants: {
        paddingLeft: "0rem",
        width: "medium",
    }
}
)
