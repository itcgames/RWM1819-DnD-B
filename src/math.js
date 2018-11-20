var utilities = {

    // simple collision check to see if a point is within a box, used to detect mouse
    pointBoxCollision: function(box, point){
        if(point.x > box.x && 
            point.x < box.x + box.width && 
            point.y > box.y && 
            point.y < box.y + box.height)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    // simple collision check to see if a box is touching another box, used to verify collision
    boundingBoxCollision: function(box_a, box_b){
        if(box_a.x < box_b.x + box_b.width &&
            box_a.x + box_a.width > box_b.x &&
            box_a.y < box_a.y + box_b.height &&
            box_a.height + box_a.y > box_b.y)
            {
                return true;
            }
            else
            {
                return false;
            }
    }
}