const logOut = () => {
    localStorage.clear("token");
    console.log("disconnected");
    window.location.reload();
};
