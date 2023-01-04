class LinkNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }

    toString() {
        return this.value;
    }
}

class LinkList {
    // 构造函数
    constructor() {
        this.head = null;
        this.length = 0;
    }

    // 追加
    append(value) {
        const node = new LinkNode(value);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            // 将当前节点挪到最后 由于循环 这里需要多判断一个是否指向头部
            while (current.next && current.next !== this.head) {
                current = current.next;
            }
            current.next = node;
            node.prev = current;
            
            // 将最后一个指针指向第一个
            node.next = this.head;
            this.head.prev = node;
        }
        this.length++;
        return this;
    }

    // 在指定对象插入链表节点
    insert(existValue, insertValue) {
        const node = new LinkNode(insertValue);
        const existNode = this.find(existValue);
        if (existNode === null) {
            throw new Error("插入的节点值不存在");
        }
        const nextNode = existNode.next;
        existNode.next = node;
        node.next = nextNode;

        node.prev = existNode;
        nextNode.prev = node;

        this.length++;
        return this;
    }

    // 删除指定对象 返回删除节点
    remove(value) {
        if (this.head === null) {
            throw new Error("链表为空，无法删除");
        }
        // 第一个删除
        if (this.head.value === value) {
            const current = this.head;
            this.head = current.next;
            this.head.prev = current.prev;

            current.next = null;
            current.prev = null;
            this.length--;
            return current;
        }

        // 查找前一个
        const preNode = this.findPre(value)
        if (preNode !== null) {
            const removeNode = preNode.next;
            const nextNode = removeNode.next;
            const prevNode = removeNode.prev;
            prevNode.next = nextNode;
            nextNode.prev = preNode;

            removeNode.next = null;
            removeNode.prev = null;
            this.length--;
            return removeNode;
        }
    }

    // 查询
    find(value) {
        if (this.head === null) {
            return null;
        }
        let current = this.head;
        while (current.next != this.head && current.value !== value) {
            current = current.next
        }
        if (current.value === value) {
            return current;
        }
        return null;
    }

    // 查询值的前一个
    findPre(value) {
        let current = this.head;
        let prevNode = null;
        while (current.next != this.head && current.next.value !== value) {
            current = current.next;
        }
        if (current.next && current.next.value === value) {
            prevNode = current;
        }

        return prevNode
    }

    toString() {
        if (this.head === null) {
            return null;
        }
        let current = this.head;
        const array = [];
        while (current.next != this.head) {
            array.push(current.value);
            current = current.next;
        }
        array.push(current.value);
        return array.join('<->');
    }
}

// 测试案例
const linkList = new LinkList();

linkList.append("1");
linkList.append("2");
linkList.append("3");

// 预期输出 1<->2<->3
console.log(linkList.toString());

linkList.insert("2", "4");
// 预期输出 1<->2<->4<->3
console.log(linkList.toString());

linkList.remove("2");
// 预期输出 1<->2<->3
console.log(linkList.toString());

// 第一个的prev 指向最后 输出3
console.log(linkList.head.prev.toString());

// 最后一个 next指向第一个 输出1
console.log(linkList.head.prev.next.toString());
