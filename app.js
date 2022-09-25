const result = document.querySelector("#result-fetch")
const imgQrCode = document.querySelector("#result-fetch img")
const btnValidate = document.querySelector("#form")
const btnDownload = document.querySelector("#btn-download")
const svg = document.querySelector(".svg")
const errorUrl = document.querySelector("#errorUrl")
const regexUrl = /^https?:\/\/(www\.)?[a-zA-Z0-9\-_\.]+\.[a-z]{2,4}((\?|\/)[a-z0-9=&\-\?\+_\/]+)*$/


btnValidate.addEventListener("submit", e => {
  e.preventDefault()
  const size =  e.target.size.value
  const url = e.target.url.value
  
  if(url.match(regexUrl) == null){
    errorUrl.textContent = "Vous devez saisir un lien valide"
  }else{
    errorUrl.textContent = ""
    result.parentElement.style.display = "block"
    result.style.display = "none"
    svg.style.display = "initial"
    setTimeout(() => qrCodeResult(size, url), 2500)
  }
})

async function fetchQrCode(size, url){
  const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${url}`)
  const blob = await response.blob()
  return blob

}

async function qrCodeResult(size, url){
      svg.style.display = "none"
      const blob = await fetchQrCode(size, encodeURIComponent(url))
      result.style.display = "initial"
      imgQrCode.src = URL.createObjectURL(blob)
      btnDownload.href = URL.createObjectURL(blob)
      btnDownload.download = "QR_Code"
}