class Style {
    constructor(){
        this.name = Math.random().toString(36).slice(2)
        $("head").append("<style id='"+this.name+"'></style>")
        this.css = $(`#${this.name}`)[0]['sheet']
        this.styles = new Map();
        this.total = 0;
    }
    addStyle(name, style){
        console.log(name);
        if(this.styles.has(name)){
            this.deleteStyle(name);
        }
        this.styles.set(name, this.total)
        this.css.insertRule(style, this.total)
        this.total++
        console.log(this.styles)
    }
    deleteStyle(name){
        let index = 0;
        for(var [k,v] of this.styles){
            if(k == name){
                this.styles.delete(name)
                this.css.deleteRule(v)
                console.log("deleted " + name);
                this.total--
                index = v;
                break;
            }
        }
        this.fixIndexing(index)
    }
    clearStyles(){
        this.styles.clear()
        this.total=0;
        while(this.css.cssRules.length != 0){
            this.css.deleteRule(0)
        }
    }
    fixIndexing(index){
        for(var [k,v] of this.styles){
            if(v > index){
                let newvar = (this.styles.get(k) - 1)
                this.styles.set(k, newvar)
            }
        }
    }
}

export default Style;