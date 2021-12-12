
window.onload = function () {
    let listState = {
        list: document.getElementById("#item-list"),
        counter: 0,
        selected: undefined,

        setSelected: function (newItem) {
            if (this.hasSelected()) {
                this.unselect();
            }

            if(newItem === null) {
                this.selected = undefined;
            } else {
                newItem.setAttribute("style", "color:red");
                this.selected = newItem;
            }
        },

        getSelected: function () {
            return this.selected;
        },

        hasSelected: function () {
            return this.selected !== undefined;
        },

        unselect: function () {
            this.selected.removeAttribute("style");
            this.selected = undefined;
        },

        selectFirst: function () {
            if (this.list.children.length !== 0) {
                this.setSelected(this.list.firstElementChild);
            }
        },

        selectLast: function () {
            if (this.list.children.length !== 0) {
                this.setSelected(this.list.lastElementChild);
            }
        },

        add: function () {
            this.list.appendChild(this.createListItem());
        },

        removeSelected: function () {
            if(this.hasSelected()) {
                let selected = this.getSelected();

                if (selected === this.list.lastElementChild && selected === this.list.firstElementChild) {
                    this.setSelected(null);
                } else if (selected === this.list.lastElementChild) {
                    this.setSelected(selected.previousElementSibling);
                } else {
                    this.setSelected(selected.nextElementSibling);
                }

                this.list.removeChild(selected);
            }
        },

        selectNext: function () {
            let foundSelected = false;
            for (let item of this.list.children) {
                if (this.selected === item) {
                    this.setSelected(this.selected === this.list.lastElementChild
                        ? this.list.firstElementChild : item.nextElementSibling);
                    foundSelected = true;
                    break;
                }
            }
            if (!foundSelected && this.list.children.length > 0) {
                this.setSelected(this.list.firstElementChild);
            }
        },

        selectPrev: function () {
            let foundSelected = false;
            for (let item of this.list.children) {
                if (this.selected === item) {
                    this.setSelected(this.selected === this.list.firstElementChild
                        ? this.list.lastElementChild : item.previousElementSibling);
                    foundSelected = true;
                    break;
                }
            }
            if (!foundSelected && this.list.children.length > 0) {
                this.setSelected(this.list.lastElementChild);
            }
        },

        addToBegin: function () {
            let newItem = this.createListItem();

            if (this.list.children.length > 0) {
                this.list.insertBefore(newItem, this.list.firstElementChild);
            } else {
                this.list.appendChild(newItem);
            }
        },

        createListItem: function () {
            let newItem = document.createElement("li");
            newItem.innerText = "Item " + this.counter++;
            return newItem;
        }

    };

    document.getElementById("#button-select-first").onclick = function () {
        listState.selectFirst();
    }

    document.getElementById("#button-select-last").onclick = function () {
        listState.selectLast();
    }

    document.getElementById("#button-select-next").onclick = function () {
        listState.selectNext();
    }

    document.getElementById("#button-select-prev").onclick = function () {
        listState.selectPrev();
    };

    document.getElementById("#button-add").onclick = function () {
        listState.add();
    };

    document.getElementById("#button-del").onclick = function () {
        listState.removeSelected();
    }

    document.getElementById("#button-add-to-begin").onclick = function () {
        listState.addToBegin();
    }
}