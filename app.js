const imgQrCode = document.querySelector("#result--image img")


fetch("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://facebook.com")
.then(res => res.blob())
.then(data => {
  const url = URL.createObjectURL(data)
  imgQrCode.src = url
})
