---
layout: Post
title: "CSE 470 Assignment 3 Part 1 - Surfaces of Revolution"
date: 2018-01-19
featured: false
---


I didn't write a blog on assignment 2 because it's wasn't overly interesting--just making a set of rotating cubes. However, assignment 3 was fairly fun and interesting and I think deserves its own blog post. First, you can visit this page to get a demo of what it is: <https://fu5ha.github.io/asu-cse470/assignment3>

The same concepts talked about in this and the next blog post are also the basis for this more complete scene renderer that I made which is based on a simplified version of THREE.js' structure: <https://fu5ha.github.io/asu-cse470/assignment4>

The main interesting things that are happening here are the creation of the surface(s) of revolution and the lighting calculations.

The surfaces of revolution are built by first creatng a parameterized curve like so:

\`F(t) = ((G(t)),(t),(0)); t in [-1, 1]\`

where \`G(t)\` is a "generator function" which has range \`(0, infty)\`. We then sweep this function around the Y axis by applying a counter-clockwise rotation matrix to it with an angle \`theta\`. This gives us a final surface definition:

\`
    S(t, theta) = [[cos(theta),0,-sin(theta)],
                     [0,1,0],
                     [sin(theta),0,cos(theta)]] * ((G(t)),(t),(0)); t in [-1, 1]; theta in [0, 2pi)
\`

\`S(t, theta) = ((G(t)cos(theta)),(t),(G(t)sin(theta)))\`

Next we discretize this continuous surface into a set of vertices. To do this we define a number of tesselations in the direction of \`t\`, \`tau\` as well as in the direction of \`theta\`, \`sigma\`. These represent the number of quads that we want in each direction, up/down and around the surface. We then step in increments of \`2 / tau in [-1, 1]\` and \`(2pi) / sigma in [0, 2pi)\` and add each resulting point to a list of points.

The next thing we need to do is calculate normal vectors at each of these vertices for use in the shading algorithm later. The normal vector is a vector pointing perpendicular to a tangent plane to the surface at that point. In this case, we want a vector that is perpendicular to both the tangent line in the direction of \`t\` and the tangent line in the direction of \`theta\`. In three dimensions, w can calculate a vector perpendicular to two other ones by taking their cross product. Therefore, if we can calculate a vector in the direction of the tangent line of \`t\`, \`vec tau\`, and in the direction \`theta\`, \`vec sigma\`, at point \`P\`, we can take the cross product \`vec sigma xx vec tau\` and get a vector \`vec n\` in the correct direction. However, we need it to also have length 1, so we'll say our final normal vector 

\`hat n = vec n / norm(vec n)\`

The order of the cross product in relation to the direction of the vectors is important; following the right hand rule, we want \`vec sigma\` to be counter-clockwise from \`vec tau\` so that the resulting vector of \`vec sigma xx vec tau\` points in the correct direction (out of the surface of revolution rather than into it). Since our previously defined rotation matrix rotates in a counter-clockwise direction, we know that increasing \`theta\` will take us further counter-clockwise. Therefore we know that our vector \`vec sigma\` will be counter-clockwise of \`vec tau\` which has its origin at the same \`theta\`. If we used a counter clockwise rotation matrix, we would do the cross product in the other order to obtain the same result.

To calculate these vectors we can simply take the partial derivatives of \`S(t, theta)\` with respect to \`t\` and \`theta\` respectively:

\`g(t) = G'(t)\`

\`vec tau = (dS)/dt = ((g(t)cos(theta)), (1), (g(t)sin(theta)))\`

\`vec sigma = (dS)/(d theta) = ((-G(t)sin(theta)), (0), (G(t)cos(theta)))\`

Now we can compute the cross product of these vectors:

\`vec n = vec sigma xx vec tau = ((G(t)cos(theta)), (-G(t) cdot g(t)), (G(t)sin(theta))) = G(t) cdot ((cos(theta)), (-g(t)), (sin(theta)))\`

However, since we don't care about the length of this vector since we are going to be normalizing it anyway, we can drop the \`G(t)\` since multiplying a vector by a scalar does not change its direction.

\`vec n = ((cos(theta)), (-g(t)), (sin(theta)))\`

\`hat n = vec n / norm(vec n)\`

Yay! Now we just do that calculation for each \`t\` and \`theta\` when we discretize the surface and put the new normal vectors in their own array buffer to be used later as well.

*Continued [in part 2 here](/blog/posts/programming/graphics/cse470hw3part2), which talks about the actual lighting calculations*
