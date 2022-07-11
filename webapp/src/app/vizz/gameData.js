import { cyrb53 } from "../utils";

const types = { 
    ACCOUNT: "ACCOUNT", 
    STORE: "STORE", 
    AVATAR: "AVATAR", 
    ITEM: "ITEM" 
}

const categories = {
    AXE: "AXE",
    CHEST: "CHEST",
    FOOD: "FOOD",
    HELMET: "HELMET",
    LEGS: "LEGS",
    PICK: "PICK",
    POTION: "POTION",
    SHOES: "SHOES",
    SWORD: "SWORD"
}

function setNode(id, level, type, title, color = "none", img = "none", category = "none") {
    return { id, type, title, img, category, color }
}

function getItemCollection(category, level, len) {
    return [...Array(len)].map((x,i) => {
        let index = i + 1;
        let id = `${category}${index}`;
        let title = `${category.toLowerCase()} ${index}`;
        let img = `/images/${category.toLowerCase()}${index}.png`;
        let color = setColor(category);
        //let color = `#e${category.charCodeAt(1)}${category.charCodeAt(0)}0`;
        return setNode(id, level, types.ITEM, title, color, img, category)
    })
}

function setNodes() {
    return [
        setNode(types.ACCOUNT,1,types.ACCOUNT, "Joe's Account", "#ffff00"),
        setNode(types.STORE,2,types.STORE, "Backpack", "#00ff00"),
        setNode(`${types.AVATAR}1`,2,types.AVATAR,"Warrior 1", "#00ff00"),
        setNode(`${types.AVATAR}2`,2,types.AVATAR,"Warrior 2", "#00ff00"),
        //...getItemCollection(categories.AXE, 3, 5),
        ...getItemCollection(categories.CHEST, 3, 5),
        //...getItemCollection(categories.FOOD, 3, 8),
        ...getItemCollection(categories.HELMET, 3, 5),
        ...getItemCollection(categories.LEGS, 3, 5),
        //...getItemCollection(categories.PICK, 3, 5),
        //...getItemCollection(categories.POTION, 3, 4),
        ...getItemCollection(categories.SHOES, 3, 5),
        ...getItemCollection(categories.SWORD, 3, 5),
    ]
}

const getSource = (n) => n.id.indexOf('1') !== -1 ? `${types.AVATAR}1` : n.id.indexOf('2') !== -1 ? `${types.AVATAR}2` : types.STORE;
function setItemLinks(nodes) {
    const filtered = nodes.filter(n => n.type === types.ITEM);
    return filtered.map(n => ({ source: getSource(n), target: n.id }))
}

function setColor(category) {
    let color;
    switch (category) {
        case "CHEST":
            color = "#ffc107";
            break;
        case "HELMET":
            color = "#ec407a";
            break;
        case "LEGS":
            color = "#ff5722";
            break;
        case "SHOES":
            color = "#9c27b0";
            break;
        case "SWORD":
            color = "#2196f3";
            break;    
        default:
            break;
    }
    return color;
}

export function getGameData() {
    let nodes = setNodes();
    let itemLinks = setItemLinks(nodes);

    return {
        nodes,
        links: [
            ...itemLinks,
            {source: types.ACCOUNT, target: types.STORE},
            {source: types.ACCOUNT, target: `${types.AVATAR}1`},
            {source: types.ACCOUNT, target: `${types.AVATAR}2`},
        ]
    }
}