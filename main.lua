function love.update(dt)
  for i = 1, 1000 do
    for j = 1, 1000 do
      local y = math.sqrt(i) * math.cos(i) -- Some arbitrary computation
    end
  end

  print(dt) -- Print delta time to the console
end