export default {
  header: {
    nav: {
      home: 'Home',
      catalog: 'Games Catalog',
      faq: 'FAQ & Support',
      contacts: 'Contacts',
      forum: 'Forum',
      purchases: 'My purchases',
      settings: 'Settings',
      support: 'Online support'
    },
    
    support: 'Support',

    signin: 'Sign In'
  },

  footer: {
    description: 'It`s time to buy a private DLC, which will allow you to confidently fight with professional and strong players.',
    links: {
      'Navigation': [
        {
          label: 'Home',
          href: '/'
        },
        {
          label: 'Games Catalog',
          href: '/catalog'
        },
        {
          label: 'FAQ & Support',
          href: '/faq'
        },
        {
          label: 'Payment and delivery',
          href: '/payment-and-delivery'
        }
      ],
      'Other': [
        {
          label: 'Policy',
          href: '/policy'
        },
        {
          label: 'Terms of use',
          href: '/terms'
        },
        {
          label: 'Contacts',
          href: '/contacts'
        }
      ]
    },

    social: 'Social'
  },

  home: {
    head: {
      h1: 'Benefits in every battle with us!',
      description: "It's time to buy private DLC that will allow you to confidently fight against professional and strong players.",
      button: {
        catalog: 'Catalog',
        signin: 'Sign In'
      },
      offer: 'Best offer'
    },

    games: {
      title: 'Popular <span>Games</span>',

      stats: {
        years: 'More than <span>3+</span> years of work',
        catalog: 'In catalog <span>{count}</span> games',
        categories: 'In categories <span>{count}</span> active products'
      }
    },

    hint: {
      title: 'Do you want more games?',
      toCatalog: 'Go to catalog'
    }
  },

  video: {
    title: 'Video',
    action: 'Watch video'
  },

  payment: {
    success: {
      title: 'Congratulations!',
      text: 'Please check your email,<br /> an activation key has been sent to it',
      button: {
        signup: 'Continue registration',
        profile: 'Go to profile'
      }
    },
    failed: {
      title: 'Payment problem',
      text: 'Oops, we encountered a problem<br/> payment, please choose another payment method<br/>',
      button: {
        support: 'Contact Support'
      }
    },
    or: 'or'
  },

  product: {
    payment: 'Payment',
    toPay: 'To pay',
    goToPay: 'Go to pay',
    pay: 'Pay',
    paymentSystems: 'Popular payment systems',
    paymentsHint: 'Each of the payment systems has different methods of accepting payments, such as Qiwi, WebMoney, YuMoney, Card, PIX, Unionpay, etc.<br /><br /> Differences in each payment system in% rate, the possibility of accepting foreign cards, as well as various payment methods',
    termsText: 'By confirming the order, I accept the <a href="/terms">terms of the user agreement</a>',
    attentionCIS: 'Activation and operation of the key is available only in the CIS countries',
    attentionGlobal: 'Key activation and operation is available in all countries',
    attentionWithouChina: 'Key activation and operation is available in all countries except China',
    requirementsSystem: 'System Requirements',
    requirementsOther: 'Additional Information',
    emailHint: 'An activation key and instructions for the product will be sent to the mail!',
    promo: 'Enter promo code',
    tabs: {
      'functions': {
        title: 'Functions',
        icon: 'IconNotes'
      },
      'system_requirements': {
        title: 'System requirements',
        icon: 'IconCPU'
      },
      'items': {
        title: 'Similar products',
        icon: 'IconEye'
      }
    },
    requirementsTypes: {
      'cpu': {
        label: 'Supported processors:',
        icon: 'CPU'
      },
      'oc': {
        label: 'Supported OS:',
        icon: 'OC'
      },
      'assembly': {
        label: 'Supported Builds:',
        icon: 'Assembly'
      },
      'type': {
        label: 'Project type:',
        icon: 'Type'
      },
      'mode': {
        label: 'Game mode:',
        icon: 'Mode'
      },
      'method': {
        label: 'The game method is not in the window:',
        icon: 'Method'
      },
      'mods': {
        label: 'Works in modes:',
        icon: 'Mods'
      },
      'spoofer': {
        label: 'Spoofer:',
        icon: 'Spoofer'
      }
    }
  },

  purchases: {
    title: 'History of your purchases',
    digiseller: 'Have you purchased a product through a',
    table: {
      id: '# order',
      name: 'Product name',
      action: 'Download',
      price: 'Price/days'
    },
    empty: {
      text: 'You have no items ;(',
      hint: 'Go to our games catalog to buy quality software.',
      action: 'Games Catalog'
    }
  },

  similar: {
    empty: {
      title: 'No related products',
      text: 'Please see other sections!'
    }
  },

  profile: {
    tabs: {
      purchases: 'My purchses',
      support: 'Online support',
      settings: 'Settings',
      logout: 'Logout'
    },

    welcome: 'Welcome back,',

    support: 'Online Support',
    bot: '<span>Zhiga</span> - Support Bot №1',
    help: 'Need help? Contact our convenient support service, Zhiga will help you in any matter!',
    openTicket: 'Open ticket',
    responseTime: 'Average response time: <span>5-30 minutes</span>',
    changeAvatar: 'Changing avatar',
    uploadAvatar: 'Upload avatar',
    
    settings: {
      title: 'Profile settings',

      info: 'Personal information',
      username: 'Username',

      email: 'E-mail',
      confirmed: 'Confirmed',
      unconfirmed: 'Unconfirmed',

      confirm: 'Confirm your e-mail!',
      confirmAction: 'Confirm',

      password: 'Password',
      confirmPassword: 'Confirm password',

      save: 'Save changes'
    },

    tickets: {
      title: 'History of your tickets',

      create: 'Create a ticket',
      enterTheme: 'Enter theme',
      createButton: 'Create',
      created: 'You have successfully created a ticket!',

      table: {
        id: '# ticket',
        theme: 'Theme',
        status: 'Status',
        date: 'Date'
      },

      solved: 'Solved',
      inProgress: 'In progress',

      empty: {
        text: "You don't have tickets!",
        hint: 'Need help? Create a ticket, we will help you!',
        action: 'Open ticket'
      }
    }
  },

  paymentAndDelivery: {
    title: 'Payment and delivery',
    text: '<p>The product can be paid for using one of the payment methods offered on the website. Currently available payment methods: Webmoney, Bank Cards, Qiwi, Yumopeu, PIX, Unionpay, Turkish Bank Card and many others.<br/><br/>The user receives the paid product manually or automatically on the same page where the payment was made. If the e-mail in your personal account matches the e-mail when paying for the goods, you can view the paid goods in your personal account. Also, during the payment process, the user specifies an e-mail address to which a link is sent to access the paid product.<br></p><h2>Refund Policy:</h2><p>1. A refund for the purchased goods is provided for cases when the site Administration is unable to fulfill its obligations. Such cases include incorrectly issued activation key, inability to provide the product and other deviations in the normal functioning of the goods paid by the buyer. There is no refund for account blocking and similar problems!</p><p>2. The refund is made according to the details that the buyer used to pay for the goods. To request a refund, you must contact the site Administration.</p>',
    systems: 'We work with payment systems:'
  },

  policy: {
    title: 'Privacy Policy'
  },

  terms: {
    title: 'Terms of use',
  },

  contacts: {
    title: 'Contacts',
    text: 'For cooperation or any other information, you can contact us at the following contacts:',
    info: 'Info',
    socials: 'Social networks for communication',
    
    name: 'Your name',
    email: 'E-mail',
    theme: 'Theme',
    message: 'Message',
    send: 'Send'
  },

  faq: {
    title: 'FAQ & Support',
    description: 'Be sure to update and download all drivers<br>and necessary programs',

    download: 'Download',

    faq: [
      {
        label: 'Recommended Drivers',
        description: 'Also, if you have anti-cheats installed, like FaceIt or ESEA, then you definitely need to remove them! If you have Valorant installed on your computer, then remove Riot Guard (This item is for DLC on all games except Valorant)',
        cards: [
          {
            title: 'Microsoft Visual C++ 2005-2019',
            label: 'Package with components',
            icon: '/images/faq/microsoftvs.png',
            link: 'https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/'
          },
          {
            title: 'Directx 12',
            label: 'Package with components',
            icon: '/images/faq/directx.png',
            link: 'https://download.microsoft.com/download/1/7/1/1718CCC4-6315-4D8E-9543-8E28A4E18C4C/dxwebsetup.exe'
          },
          {
            title: 'Microsoft Net Framework 4.7.1',
            label: 'Package with components',
            icon: '/images/faq/dotnet.png',
            link: 'https://www.microsoft.com/ru-RU/download/details.aspx?id=55167'
          },
          {
            title: 'NVIDIA',
            label: 'Video driver update',
            icon: '/images/faq/nvidea.png',
            link: 'https://www.nvidia.ru/Download/index.aspx?lang=ru'
          },
          {
            title: 'AMD',
            label: 'Video driver update',
            icon: '/images/faq/amd.png',
            link: 'https://www.amd.com/ru/support'
          },
          {
            title: 'DriverPack',
            label: 'Installing all drivers',
            icon: '/images/faq/driverpack.png',
            link: 'https://www.google.com/search?q=driverpack+solution&oq=driverpack'
          }
        ]
      },
      {
        label: 'Disabling protection',
        isSmallCards: true,
        cards: [
          {
            title: 'Auto turn off Windows Smart Screen',
            icon: '/images/faq/wss.png',
            link: 'https://yadi.sk/d/WnIQNa5k3TLPsq',
          },
          {
            title: 'Windows Defender Management',
            icon: '/images/faq/defender.png',
            link: 'https://www.softportal.com/software-43861-defender-control.html',
            button: 'View'
          },
          {
            title: 'Auto Disable Accounts (UAC)',
            icon: '/images/faq/uac.png',
            link: 'https://disk.yandex.ru/d/jDyGM3TN3TLPt2',
          },
          {
            title: 'Disable Secure Boot in bios',
            icon: '/images/faq/bios.png',
            link: 'https://www.youtube.com/watch?v=RjwT85icNHg',
            button: 'View'
          },
          {
            title: 'Enable UEFI in BIOS',
            icon: '/images/faq/bios.png',
            link: 'https://learn.microsoft.com/ru-ru/windows/deployment/mbr-to-gpt?source=recommendations',
            button: 'View'
          }
        ]
      },
      {
        label: 'Auxiliary programs',
        isSmallCards: true,
        cards: [
          {
            title: 'Working with WinRar archives',
            icon: '/images/faq/winrar.png',
            link: 'https://www.win-rar.com/start.html?&L=4'
          },
          {
            title: 'Screenshot of your problem',
            icon: '/images/faq/screenshot.png',
            link: 'https://app.prntscr.com/en/index.html'
          },
          {
            title: 'Teamviewer remote access',
            icon: '/images/faq/teamviewer.png',
            link: 'https://www.teamviewer.com/'
          },
          {
            title: 'AnyDesk Remote Access',
            icon: '/images/faq/anydesk.png',
            link: 'https://anydesk.com/ru'
          }
        ]
      }
    ],

    popular: {
      title: 'Popular problems',
      items: [
        {
          icon: 'Pay',
          label: 'Problems with payment',
          link: ''
        },
        {
          icon: 'Soft',
          label: 'Software issues',
          link: ''
        },
        {
          icon: 'Key',
          label: 'Problems with key activation',
          link: ''
        },
        {
          icon: 'Other',
          label: 'Other problems',
          link: ''
        }
      ]
    }
  },

  signin: {
    title: 'Sign In',
    email: 'Enter e-mail',
    password: 'Enter password',
    remember: 'Remember me',
    forgotPassword: 'Forgot password?',

    action: 'Sign In',

    hint: `Don't have a personal account? <a href="/signup">Sign it up</a>`
  },

  signup: {
    title: 'Sign Up',
    username: 'Username',
    email: 'Enter e-mail',
    password: 'Create password',
    repeatPassword: 'Repeat password',
    action: 'Create account',

    hint: 'I have an account! <a href="/signin">Sign in</a>'
  },

  forgot: {
    title: 'Forgot password?',
    enterEmail: {
      email: 'Enter e-mail',
      text: 'Enter the email address associated with your account, we will send you a link to reset your password.',
      action: 'Send',
      hint: 'I have an account! <a href="/signin">Sign in</a>'
    },
    sentCode: {
      text: 'Enter the code sent to your email to restore access to your account',
      code: 'Enter code',
      action: 'Confirm'
    },
    newPassword: {
      text: 'Enter the new password you want to use to access your account',
      newPassword: 'Enter new password',
      repPassword: 'Repeat password',
      action: 'Reset'
    }
  },

  search: {
    results: 'Search results',
    empty: {
      title: 'There is no such game yet.',
      text: 'Please try again or enter a different game name.'
    }
  },

  logout: {
    text: 'Do you really want to leave?',
    yes: 'Yes',
    no: 'No'
  },

  startWith: 'Start with',

  apply: 'Apply',
  sale: 'Sale',

  ticket: {
    name: 'Ticket',
    title: 'Do you still have questions?',
    text: 'If you have solved your problem, you can close the ticket',
    close: 'Close ticket',
    gotoTickets: 'To the list of tickets',
    toAdminChat: 'Go to chat with the administration'
  }
}