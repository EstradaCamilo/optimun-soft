export default defineAppConfig({
  ui: {
    gray: "zinc",
    primary: "cerulean",
    button: {
      base: "justify-center",
      variant: {
        solid: "shadow-none",
      },
      color: {
        white: {
          solid: "shadow-none ring-gray-200 text-gray-500 ",
        },
        gray: {
          solid: "shadow-none ring-gray-200",
        },
      },
      default: {
        size: "md",
        loadingIcon: "i-ph-circle-notch",
      },
    },
    formGroup: {
      default: {
        size: "md",
      },
      label: {
        base: "font-normal",
        required: "text-sm after:text-gray-500 font-normal",
      },
      error: "text-xs mt-1",
    },
    input: {
      default: {
        size: "md",
        base: "shadow-none",
      },
      color: {
        white: {
          outline: "shadow-none ring-gray-200",
        },
        gray: {
          outline: "shadow-none ring-gray-200",
        },
      },
    },
    select: {
      default: {
        size: "md",
        base: "shadow-none",
      },
      color: {
        white: {
          outline: "shadow-none ring-gray-200",
        },
      },
    },
    textarea: {
      default: {
        size: "md",
        base: "shadow-none",
      },
      color: {
        white: {
          outline: "shadow-none ring-gray-200",
        },
        gray: {
          outline: "shadow-none ring-gray-200",
        },
      },
    },
    table: {
      wrapper: "border rounded-md bg-white",
      divide: "divide-y divide-gray-200",
      th: {
        color: "text-gray-900",
        base: "h-[42px] max-h-[42px] min-h-[42px]",
        padding: "py-[3px]",
        font: "font-medium",
      },
      td: {
        base: "h-[42px] max-h-[42px] min-h-[42px]",
        padding: "py-1",
      },
      default: {
        sortButton: {
          icon: "i-ph-arrows-down-up-light",
          class: "hover:text-primary",
        },
        loadingState: {
          label: "Cargando...",
          icon: "i-ph-arrows-counter-clockwise-duotone",
        },
        emptyState: {
          label: "Sin registros",
          icon: "i-ph-database-duotone",
        },
      },
      loadingState: {
        wrapper: "px-4 py-4 sm:px-14",
      },
      emptyState: {
        wrapper: "px-4 py-4 sm:px-14",
      },
    },
    modal: {
      width: "w-96 sm:max-w-96",
      overlay: {
        background: "bg-gray-200/75",
      },
      shadow: "shadow-sm",
    },
    card: {
      body: {
        base: "",
        padding: "px-4 py-4 sm:p-4",
      },
      header: {
        base: "",
        padding: "px-4 py-4 sm:p-4",
      },
      footer: {
        base: "",
        padding: "px-4 py-4 sm:p-4",
      },
    },
    pagination: {
      size: "md",
      base: "min-w-[2rem] min-h-[2rem] justify-center ring-gray-200 shadow-none",
    },
    notification: {
      icon: {
        base: "w-6 h-6",
      },
      default: {
        timeout: 3000,
      },
    },
    verticalNavigation: {
      wrapper: "grid gap-0.5",
      padding: "px-3 py-2",
      size: "text-sm",
      active:
        "text-primary before:bg-primary-50 before:border-l-2 before:border-primary before:rounded-0 font-semibold",
      icon: {
        base: "h-5 w-5 z-10 my-[1px]",
        active: "text-primary",
      },
    },
  },
});
