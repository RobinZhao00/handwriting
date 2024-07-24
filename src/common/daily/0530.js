const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-logger');
const session = require('koa-session');
const compress = require('koa-compress');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const json = require('koa-json');
const jwt = require('koa-jwt');
const responseTime = require('koa-response-time');
const views = require('koa-views');
const validate = require('koa-validate');
const rateLimit = require('koa-ratelimit');

const app = new Koa();
const router = new Router();

// 使用中间件
app.use(logger());
app.use(bodyParser());
app.use(serve('./public'));
app.keys = ['some secret hurr'];
app.use(session(app));
app.use(compress());
app.use(cors());
app.use(helmet());
app.use(json());
app.use(responseTime());
app.use(views(__dirname + '/views', { extension: 'pug' }));
app.use(validate());
app.use(rateLimit({ driver: 'memory', db: new Map(), duration: 60000, errorMessage: 'Sometimes You Just Have to Slow Down.', id: (ctx) => ctx.ip, headers: { remaining: 'Rate-Limit-Remaining', reset: 'Rate-Limit-Reset', total: 'Rate-Limit-Total' }, max: 100 }));

// 路由定义
router.get('/', async (ctx) => {
  await ctx.render('index', { title: 'Hello Koa' });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}


class Tree {
  constructor() {
    this.root = null;
  }

  // 添加节点
  add(value, parentValue) {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const parent = this.findBFS(parentValue);
    if (parent) {
      parent.children.push(newNode);
    } else {
      throw new Error('Cannot add node to a non-existing parent.');
    }
  }

  // 删除节点
  remove(value) {
    if (this.root === null) {
      return;
    }

    if (this.root.value === value) {
      this.root = null;
      return;
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();

      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].value === value) {
          node.children.splice(i, 1);
          return;
        }
        queue.push(node.children[i]);
      }
    }
  }

  // 广度优先搜索（BFS）查找节点
  findBFS(value) {
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();

      if (node.value === value) {
        return node;
      }

      for (const child of node.children) {
        queue.push(child);
      }
    }
    return null;
  }

  // 深度优先搜索（DFS）查找节点
  findDFS(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (node.value === value) {
      return node;
    }

    for (const child of node.children) {
      const found = this.findDFS(value, child);
      if (found) {
        return found;
      }
    }

    return null;
  }

  // 遍历树（广度优先遍历）
  traverseBFS(callback) {
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      for (const child of node.children) {
        queue.push(child);
      }
    }
  }

  // 遍历树（深度优先遍历）
  traverseDFS(callback, node = this.root) {
    if (node === null) {
      return;
    }

    callback(node);

    for (const child of node.children) {
      this.traverseDFS(callback, child);
    }
  }
}
