function goBack() {
  const res = window.confirm(
    "Tem certeza que deseja retornar a home? Caso volte, perderá os dados aqui emitidos"
  );
  switch (res) {
    case true:
      window.location.assign("/");
      break;

    case false:
      return;
      break;

    default:
      return;
      break;
  }
}
