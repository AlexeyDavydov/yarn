exports.getYarnById = function(id) {
    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);
    
    let yarn = yarns.find(function(item){
        if (item.id == id) return true;
    })   

    return yarn; 
}

exports.deleteYarn = function(id){
    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);

   let index = yarns.findIndex(function(item){
        if (item.id == id) return true;
    })    
   
    if (index> -1) {
        let yarn = yarns.splice(index,1);
       
        let dataNew = JSON.stringify(yarns);
        fs.writeFileSync("yarn.json",dataNew);
        return yarn;
    } else  {
        throw new Error("Yarn not found");
    }
}

exports.updateYarn =function(body){
    let colourYarn = body.colour;
    let firmaYarn = body.firma;
    let articulYarn = body.articul;
    let id = body.id;

    let yarn = getYarnById(id);


    if(yarn) {
        yarn.colour = colourYarn;
        yarn.articul = articulYarn;
        yarn.firma = firmaYarn;
        let dataNew = JSON.stringify(yarns);
            fs.writeFileSync("yarn.json",dataNew);
            return yarn; 
    } else{
        throw new Error("Yarn wasn't created");
    } 
}

exports.createYarn = function(body){
    let colourYarn = body.colour;
    let firmaYarn = body.firma;
    let articulYarn = body.articul;

    let yarn = {
        firma:firmaYarn, 
        articul:articulYarn, 
        colour:colourYarn
    };

    const data = fs.readFileSync("yarn.json", "utf8");
    let yarns = JSON.parse(data);

    let id = yarns.length;
    id = id+1;
    yarn.id=id;
    yarns.push(yarn);

    let dataNew = JSON.stringify(yarns);
    fs.writeFileSync("yarn.json",dataNew);
    return yarn;
}