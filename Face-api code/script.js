const container = document.querySelector('#container');
const fileInput = document.querySelector('#file-input');

async function init() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')

    toastify({
        text: "đã tải xong "
    }).showToast();
}

init()

async function uploadImage() {
    const imgFile = fileInput.files[0];
    // create an HTMLImageElement from a Blob
    const img = await faceapi.bufferToImage(imgFile)
    const canvas = faceapi.createCanvasFromMedia(img)

    container.innerHTML= ""
    container.append(img);
    container.append(canvas);

    const size = {
        with: img.with,
        height: img.height
    }

    const Detection = faceapi.matchDimensions(canvas, size)
    const resizeDetection = faceapi.resizeResults(Detection,size)

    faceapi.draw.drawDetections(canvas,resizeDetection)


}
