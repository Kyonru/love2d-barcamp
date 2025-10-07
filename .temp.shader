function love.load()
  -- Load the image you want to apply the effect to
  image = love.graphics.newImage("image.png")

  -- Load the shader file
  wiggleShader = love.graphics.newShader("assets/blob.glsl")

  -- Set the values for the wiggle effect
  wiggleShader:send("amplitude", 0.05)
  wiggleShader:send("frequency", 5)
  -- NEW: Control how fast the direction changes. Higher is faster.
  wiggleShader:send("direction_speed", 5)

  -- A variable to keep track of time for the animation
  time = 0
end

function love.update(dt)
  -- Increment the time counter
  time = time + dt

  -- Send the updated time to the shader every frame
  wiggleShader:send("u_time", time)
end

function love.draw()
  -- Tell LÖVE to use our shader
  love.graphics.setShader(wiggleShader)

  -- Draw the image at the center of the screen
  local imgWidth = image:getWidth()
  local imgHeight = image:getHeight()
  local screenWidth = love.graphics.getWidth()
  local screenHeight = love.graphics.getHeight()
  love.graphics.draw(image, (screenWidth - imgWidth) / 2, (screenHeight - imgHeight) / 2)

  -- Unset the shader
  love.graphics.setShader()
end


```
// Uniform variables sent from our LÖVE code
extern number u_time;
extern number amplitude;
extern number frequency;
extern number direction_speed; // NEW

// The pixel shader function
vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
    // 1. Calculate the wiggle amount (same as before)
    // This is a single number representing the "strength" of the push.
number offset_amount = sin(texture_coords.y * frequency + u_time * 5.0) * amplitude;

    // 2. Create a direction vector that rotates over time
    // As u_time increases, cos() and sin() will cycle, rotating the vector.
vec2 direction = vec2(cos(u_time * direction_speed), sin(u_time * direction_speed));

    // 3. Apply the wiggle amount in the calculated direction
    // We multiply the direction vector by the offset amount and add it to the original coordinates.
vec2 new_coords = texture_coords + (direction * offset_amount);

    // Get the pixel color from the image at the new, wiggling coordinates
vec4 pixel_color = Texel(texture, new_coords);

    // Return the final color
return pixel_color * color;
}

```