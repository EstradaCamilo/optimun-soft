export const toastService = {
  success({ description = "Operación exitosa" }) {
    useToast().add({
      title: "¡Enhorabuena!",
      description,
      icon: "i-ph-check",
      color: "green",
    });
  },

  error({ description = "Ha ocurrido un error" }) {
    useToast().add({
      title: "¡Error!",
      description,
      icon: "i-ph-x",
      color: "red",
    });
  },
};
