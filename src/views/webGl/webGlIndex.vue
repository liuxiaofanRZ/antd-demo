<template>
  <div class="webGlIndex">
    <canvas id="glcanvas" width="640" height="480">
      你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code> 元素.
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'webGlIndex',
  data() {
    return {}
  },
  mounted() {
    this.main()
  },
  methods: {
    main() {
      const canvas = document.querySelector('#glcanvas')
      // 初始化WebGL上下文
      const gl = canvas.getContext('webgl')

      // 确认WebGL支持性
      if (!gl) {
        alert('无法初始化WebGL，你的浏览器、操作系统或硬件等可能不支持WebGL。')
        return
      }

      // 使用完全不透明的黑色清除所有图像
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      // 用上面指定的颜色清除缓冲区
      gl.clear(gl.COLOR_BUFFER_BIT)
    },
    drawScene(gl, programInfo, buffers) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
      gl.clearDepth(1.0) // Clear everything
      gl.enable(gl.DEPTH_TEST) // Enable depth testing
      gl.depthFunc(gl.LEQUAL) // Near things obscure far things

      // Clear the canvas before we start drawing on it.

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      // Create a perspective matrix, a special matrix that is
      // used to simulate the distortion of perspective in a camera.
      // Our field of view is 45 degrees, with a width/height
      // ratio that matches the display size of the canvas
      // and we only want to see objects between 0.1 units
      // and 100 units away from the camera.

      const fieldOfView = (45 * Math.PI) / 180 // in radians
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
      const zNear = 0.1
      const zFar = 100.0
      const projectionMatrix = mat4.create()

      // note: glmatrix.js always has the first argument
      // as the destination to receive the result.
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

      // Set the drawing position to the "identity" point, which is
      // the center of the scene.
      const modelViewMatrix = mat4.create()

      // Now move the drawing position a bit to where we want to
      // start drawing the square.

      mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0],
      ) // amount to translate

      // Tell WebGL how to pull out the positions from the position
      // buffer into the vertexPosition attribute.
      {
        const numComponents = 3 // pull out 3 values per iteration
        const type = gl.FLOAT // the data in the buffer is 32bit floats
        const normalize = false // don't normalize
        const stride = 0 // how many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        const offset = 0 // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset,
        )
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
      }

      // Tell WebGL to use our program when drawing

      gl.useProgram(programInfo.program)

      // Set the shader uniforms

      gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
      )
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix,
      )

      {
        const offset = 0
        const vertexCount = 4
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
      }
    },
  },
}
</script>

<style lang="less">
.webGlIndex {
}
</style>
