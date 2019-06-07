(function () {
  let dropbox = document.getElementById('dropbox')
  let upload = document.getElementById('upload')

  if (typeof dropbox === 'undefined') {
    console.warn("no div with id='dropbox' found for uploading the images. Aborting!")
    return
  }
  if (typeof upload === 'undefined') {
    console.warn("no input with id='upload' found for uploading the images. Aborting!")
    return
  }

  document.addEventListener(
    'drop',
    (e) => {
      e.preventDefault()
    }, false
  )
  document.addEventListener(
    'dragover',
    (e) => {
      e.preventDefault()
    }, false
  )
  dropbox.addEventListener(
    'drop',
    (e) => {
      e.preventDefault()
      handleFiles(e.dataTransfer.files)
    }, false
  )
  dropbox.addEventListener(
    'click',
    (e) => {
      e.preventDefault()
      upload.click()
    }, false
  )
  upload.addEventListener(
    'change',
    (e) => {
      handleFiles(upload.files)
    }, false
  )

  function handleFiles (files) {
    for (let file of files) {
      if (file.type.startsWith('image/')) {
        let img = document.createElement('img')
        let figure = document.createElement('figure')
        let figcap = document.createElement('figcaption')
        let input = document.createElement('input')

        img.file = file
        input.type = 'text'
        input.maxLength = 78
        input.addEventListener('click', (e) => e.stopPropagation())
        input.placeholder = 'Beschrijving'

        let reader = new window.FileReader()
        reader.onload = (function (aImg) {
          return (e) => {
            aImg.src = e.target.result
          }
        })(img)
        reader.readAsDataURL(file)
        figure.appendChild(img)
        dropbox
          .appendChild(figure)
          .appendChild(figcap)
          .appendChild(input)

        img.addEventListener(
          'click',
          (e) => {
            e.stopPropagation()
            img.parentElement.remove()
            let data = new window.FormData()
            data.append('remove', img.file)
            window.fetch(
              'images.php',
              {
                method: 'POST',
                body: data
              }
            ).then(
              (resp) => {
                console.log(resp)
              }
            )
          }
        )
        setTimeout(
          () => {
            let width = img.naturalWidth
            let height = img.naturalHeight
            if (width !== 1200 || height !== 800) {
              window.alert('An image for the imagegallery needs to be 1200x800 in size!')
              img.remove()
              input.remove()
              upload.value = ''
            }
          }, 250
        )
      } else {
        window.alert('This is not an image file!')
        upload.value = ''
      }
    }
  }
})()
