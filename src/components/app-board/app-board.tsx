import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "app-board",
  styleUrl: "app-board.scss"
})
export class AppHome {
  @Prop() text: string = "";
  @Prop() author: string = "";
  @Prop() color: string = "";
  @Prop() fontSize: number = 16;

  sanitaize(text: string) {
    return text.replace(/</g, "&lt;");
  }

  replaceHyphen(text: string) {
    let regexp_text = /(ー)/g; // ']))/;
    let regexp_makeCombine = (_, text, __, ___) => {
      return '<span class="hyphen">' + text + "</span>";
    };

    return text.replace(regexp_text, regexp_makeCombine);
  }

  replaceNumeric(text: string) {
    let regexp_numeric = /(\d{1,3})/g; // ']))/;
    let regexp_makeCombine = (_, numeric, __, ___) => {
      return '<span class="combine">' + numeric + "</span>";
    };

    return text.replace(regexp_numeric, regexp_makeCombine);
  }

  render() {
    return [
      <div id="src-board" class="board-wrapper" style={{ color: this.color }}>
        <div
          class="board-subtitle"
          innerHTML={this.replaceHyphen("ジェネレーター")}
        />
        <div class="board-title">はたらく言葉たち</div>
        <div class="board" style={{ borderColor: this.color }}>
          <div class="text" style={{ fontSize: this.fontSize + "px" }}>
            {this.text}
          </div>
          <div
            class="author"
            innerHTML={this.replaceNumeric(this.sanitaize(this.author))}
          />
        </div>
      </div>
    ];
  }
}
