import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "app-board",
  styleUrl: "app-board.scss"
})
export class AppHome {
  @Prop() text: string = "";
  @Prop() author: string = "";

  sanitaize(text: string) {
    return text.replace(/</g, "&lt;");
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
      <div class="board-wrapper">
        <div class="board-title">はた言ジェネレーター</div>
        <div class="board">
          <div class="text">{this.text}</div>
          <div
            class="author"
            innerHTML={this.replaceNumeric(this.sanitaize(this.author))}
          />
        </div>
      </div>
    ];
  }
}
