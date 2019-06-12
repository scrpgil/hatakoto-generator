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

  replaceNumeric(text: string) {
    let regexp_numeric = /(\d{1,3})/g; // ']))/;
    let regexp_makeCombine = (_, numeric, __, ___) => {
      return '<span class="combine">' + numeric + "</span>";
    };

    return text.replace(regexp_numeric, regexp_makeCombine);
  }

  render() {
    console.log(this.color);
    return [
      <div class="board-wrapper" style={{ color: this.color }}>
        <div class="board-subtitle">ジェネレーター</div>
        <div class="board-title">はたらく言葉たち</div>
        <div
          class="board"
          style={{ borderColor: this.color }}
        >
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
