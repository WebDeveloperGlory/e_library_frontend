import { bookmark, home, random, recent, request, support, user, wishlist } from "../assets"

export const sideLinks = {
    title: "BooksGalore",
    links: [
        {
            title: "Home",
            links: [
                {
                    name: "Homepage",
                    ref: "",
                    icon: home
                }
            ]
        },
        // {
        //     title: "Browse",
        //     links: [
        //         {
        //             name: "Recently Added",
        //             ref: "recent",
        //             icon: recent
        //         },
        //         {
        //             name: "Random",
        //             ref: "random",
        //             icon: random
        //         }
        //     ]
        // },
        {
            title: "Personal",
            links: [
                {
                    name: "User",
                    ref:'user',
                    icon: user
                },
                {
                    name: "Random",
                    ref: "random",
                    icon: wishlist
                }
            ]
        },
        {
            title: "Contact",
            links: [
                {
                    name: "Request A Book",
                    ref: "request",
                    icon: request
                },
                {
                    name: "Support",
                    ref: "contact_us",
                    icon: support
                }
            ]
        }
    ]
}

export const navLinks = {
    siteName: "Booksgalore",
    loggedIn: [
        {
            id: "home",
            route: "/",
            title: "Home"
        }
    ],
    notLoggedIn: [
        {
            id: "signUp",
            route: "/signup",
            title: "Sign Up"
        },
        {
            id: "login",
            route: "/login",
            title: "Login"
        }
    ]
}

export const auth = {
    authText: {
        signUp: "Don't Have An Account?",
        login: "Already Have An Account?",
        signUph2: "Register",
        loginh2: "Sign In"
    },
    authLinks: {
        signUp: "Sign Up",
        login: "Login"
    }
}
export const myProfile = {
    dropdownHead: 'User Profile',
    dropdownPoints: 'Points: ',
    dropdown: [
        {
            id: 'profileSettings',
            title: 'My Profile',
            subTitle: 'Veiw Profile'
        },
        {
            id: 'myWishlist',
            title: 'Wishlist',
            subTitle: 'View My Wishlist'
        },
        {
            id: 'requestBook',
            title: 'Request Books',
            subTitle: 'Request A Book To Be Added'
        }
    ]
}
export const adminRec = {
    year: "Year: ",
    series: "Order In Series: ",
    genres: "Geners: "
}
export const filterGenre = {
    genres: [
        {
            name: 'Action',
            state: 'action'
        },
        {
            name: 'Adventure',
            state: 'adventure'
        },
        {
            name: 'Comedy',
            state: 'comedy'
        },
        {
            name: 'Romance',
            state: 'romance'
        }
    ]
}
export const contactFields = {
    title: "Contact Us",
    firstSection: [
        {
            title: 'First Name',
            id: 'first_name'
        },
        {
            title: 'Last Name',
            id: 'last_name'
        }
    ],
    secondSection: [
        {
            title: 'Email',
            id: 'email'
        }
    ],
    thirdSection: [
        {
            title: 'Type Your Message Here',
            id: 'msg'
        }
    ]
}
export const requestFields = {
    title: 'Request/Donate A Book',
    fields: [
        {
            title: 'First Name',
            id: 'first_name'
        },
        {
            title: 'Last Name',
            id: 'last_name'
        },
        {
            title: 'Email',
            id: 'email'
        },
        {
            title: 'Book Title',
            id: 'book_name'
        },
        {
            title: 'Book Image',
            id: 'book_img'
        },
        {
            title: 'Drive/Cloud Link(Optional)',
            id: 'book_link'
        }
    ]
}