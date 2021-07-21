var Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
});
export function toastFire() {
    $(document).Toasts("create", {
        class: "bg-success",
        title: "Toast Title",
        subtitle: "Subtitle",
        body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    });
}

