class Polygon extends Shape
{
    /**
     * The default constructor of the class.
     * @param {Vector2[]} vertices 
     */
    constructor(vertices) {
        super(vertices[0]);  //  Call the parent classes constructor.
        this.setVertices(vertices);
    }

    /**
     * Returns the centre of the shape.
     */
    getCentre() {        
        //  https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
        var vertexArrayCopy = [];
        this.vertices.forEach(vertex => {
            vertexArrayCopy.push(vertex);
        });
        var first = vertexArrayCopy[0];
        var last = vertexArrayCopy[vertexArrayCopy.length - 1];
        //  Close the shape if not already closed.
        if (first != last) {
            vertexArrayCopy.push(first);
        }
        var twiceArea = 0;
        var x = 0;
        var y = 0;
        var numOfVertices = vertexArrayCopy.length;
        var f = 0;
        for(var i = 0, j = numOfVertices-1; i < numOfVertices; j = i++) {
            var p1 = vertexArrayCopy[i];
            var p2 = vertexArrayCopy[j];
            f = (p1.y - first.y) * (p2.x - first.x) - (p2.y - first.y) * (p1.x - first.x);
            twiceArea += f;
            x += (p1.x + p2.x - 2 * first.x) * f;
            y += (p1.y + p2.y - 2 * first.y) * f;
        }
        f = twiceArea * 3;
        return new Vector2(x/f + first.x, y/f + first.y);      
    }

    /**
     * Returns the vertices of the shape.
     * @returns {Vector2[]}
     */
    getVertices() {
        if (this.vertices === undefined) {
            this.vertices = [];
        }
        return this.vertices;
    }

    /**
     * Sets the vertices of the shape.
     * @param {Vector2[]} vertices 
     */
    setVertices(vertices) {
        this.vertices = vertices;
    }

    /**
     * Adds a single vertex to the shape.
     * @param {Vector2} vertex 
     */
    addVertex(vertex) {
        this.vertices.push(vertex);
    }

    /**
     * Removes a vertex from vertices.
     * @param {Vector2} vertex 
     */
    removeVertex(vertex) {
        var index = this.vertices.indexOf(vertex);
        if (index > -1) {
            this.vertices.splice(index, 1);
        }
    }

    /**
     * Projects the vertices of the shape onto the axis.
     * @param {Vector2} axis 
     */
    project(axis) {
        var min = axis.dotProduct(this.vertices[0]);
        var max = min;
        for (var i = 1; i < this.vertices.length; i++) {
            var p = axis.dotProduct(this.vertices[i]);
            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        }
        var proj = [];
        proj['min'] = min;
        proj['max'] = max;
        return proj;
    }

    /**
     * Returns an array of the axes the shapes must be projected onto.
     * @returns {Vector2[]}
     */
    Axes() {
        var axes = [];
        for(var i = 0; i < this.vertices.length; i++) {
            var p1 = this.vertices[i];
            var p2 = this.vertices[i + 1 == this.vertices.length ? 0 : i + 1];
            var edge = p1.subtract(p2);
            var normal = edge.perp();
            axes[i] = normal;
        }
        return axes
    }

    /**
     * Rotates the Polygon by the angle.
     * @param {Float} angle 
     */
    rotate(angle) {
        var angleInRadians =MathHelper.degreesToRadians(angle);
        var vertexMatrix = [];
        this.vertices.forEach(vertex => {
            vertexMatrix.push([vertex.x, vertex.y]);
        });
        var centre = this.getCentre();
        var centreMatrix = [];
        for(var i = 0; i < vertexMatrix.length; i++) {
            centreMatrix.push([centre.x, centre.y]);
        }
        var rotationMatrix = [[Math.cos(angleInRadians), Math.sin(angleInRadians)],[-Math.sin(angleInRadians), Math.cos(angleInRadians)]];
        var subResultMatrix = this.subMatrices(vertexMatrix, centreMatrix);
        var multiplyMatrixResult = this.multiplyMatrices(subResultMatrix, rotationMatrix);
        var newVertexMatrix = this.addMatrices(multiplyMatrixResult, centreMatrix);
        for(var i = 0; i < newVertexMatrix.length; i++){
            this.vertices[i] = new Vector2(newVertexMatrix[i][0], newVertexMatrix[i][1]);
        }
    }

    /**
     * Scales the Polygon keeping the centre point the same.
     * @param {Float} scale 
     */
    scale(scale) {
        var vertexMatrix = [];
        this.vertices.forEach(vertex => {
            vertexMatrix.push([vertex.x, vertex.y]);
        });
        var centre = this.getCentre();
        var centreMatrix = [];
        for(var i = 0; i < vertexMatrix.length; i++) {
            centreMatrix.push([centre.x, centre.y]);
        }
        var scaleMatrix = [[scale, 0] ,[0, scale]];
        var subResultMatrix = this.subMatrices(vertexMatrix, centreMatrix);
        var multiplyMatrixResult = this.multiplyMatrices(subResultMatrix, scaleMatrix);
        var newVertexMatrix = this.addMatrices(multiplyMatrixResult, centreMatrix);
        for(var i = 0; i < newVertexMatrix.length; i++){
            this.vertices[i] = new Vector2(newVertexMatrix[i][0], newVertexMatrix[i][1]);
        }
    }

    /**
     * Adds x and y to their respective object values.
     * @param {Integer} x 
     * @param {Integer} y 
     */
    move(x, y) {
        this.vertices.forEach(vertex => {
            vertex.x += x;
            vertex.y += y;
        });
    }

    

    /**
     * 
     * @param {Scalar[][]} m1 
     * @param {Scalar[][]} m2 
     */
    multiplyMatrices(m1, m2) {
        var result = [];
        for (var i = 0; i < m1.length; i++) {
            result[i] = [];
            for (var j = 0; j < m2[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < m1[0].length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    /**
     * 
     * @param {Scalar[][]} m1 
     * @param {Scalar[][]} m2 
     */
    addMatrices(m1, m2) {
        var result = [];
        for(var i = 0; i < m1.length; i++){
            result[i] = [m1[i][0] + m2[i][0], m1[i][1] + m2[i][1]];
        }
        return result;
    }

    /**
     * 
     * @param {Scalar[][]} m1 
     * @param {Scalar[][]} m2 
     */
    subMatrices(m1, m2) {
        var result = [];
        for(var i = 0; i < m1.length; i++){
            result[i] = [m1[i][0] - m2[i][0], m1[i][1] - m2[i][1]];
        }
        return result;
    }

}