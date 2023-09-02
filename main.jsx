const React = {
  createElement(tag, props, ...children) {
    // used for sourcemaps
    delete props.__source;
    delete props.__self;

    if (typeof tag === "function") {
      return tag(props);
    }

    return {
      tag,
      props,
      children,
    };
  },
};

const User = ({ name }) => {
  return <b>Welcome, {name}</b>;
};

const App = () => {
  return (
    <div
      style={{
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        width: "300px",
      }}
    >
      <h1>Rendering JSX</h1>
      <p>I can do</p>
      <input type="text" placeholder="even this" />
      <span>it renders anything</span>
      <User name={"i am a passed prop"} />

      <a href="https://youtu.be/OxkbNLsiBoY">https://youtu.be/OxkbNLsiBoY</a>
      <a
        href="
        https://kommunity.com/js-izmir
      "
      >
        jsizmir kommunity
      </a>
    </div>
  );
};

function render(reactElement, container) {
  if (["string", "number"].includes(typeof reactElement)) {
    container.appendChild(document.createTextNode(String(reactElement)));
    return;
  }

  const actualDomElement = document.createElement(reactElement.tag);

  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter((propName) => propName !== "children")
      .forEach((propName) => {
        actualDomElement[propName] = reactElement.props[propName];

        if (propName === "style") {
          const styleObj = reactElement.props[propName];
          Object.keys(styleObj).forEach((styleName) => {
            actualDomElement.style[styleName] = styleObj[styleName];
          });
        }
      });
  }

  if (reactElement.children) {
    if (!Array.isArray(reactElement.children)) {
      render(reactElement.children, actualDomElement);
    } else {
      reactElement.children.forEach((child) => {
        render(child, actualDomElement);
      });
    }
  }

  container.appendChild(actualDomElement);
}

render(<App />, document.getElementById("root"));
