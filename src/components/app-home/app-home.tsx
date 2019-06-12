import { Component, h, State, Prop } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss"
})
export class AppHome {
  @State() text: string = "本文を入力";
  @State() author: string = "肩書きを入力";
  @State() color: string = "success";
  @State() hex: string = "#419031";
  @State() fontSize: number = 16;

  colors = [
    {
      name: "緑",
      color: "success",
      hex: "#419031"
    },
    {
      name: "青",
      color: "secondary",
      hex: "#2950AA"
    },
    {
      name: "ピンク",
      color: "tertiary",
      hex: "#CC8FAF"
    }
  ];

  @Prop({ connect: "ion-toast-controller" })
  toastCtrl: HTMLIonToastControllerElement;

  componentDidLoad() {
    const text = this.getQueryVariable("text");
    if (text) {
      this.text = decodeURIComponent(text);
    }
    const author = this.getQueryVariable("author");
    if (author) {
      this.author = decodeURIComponent(author);
    }
    const color = this.getQueryVariable("color");
    if (color) {
      this.color = color;
      for (const color of this.colors) {
        if (this.color == color.color) {
          this.hex = color.hex;
        }
      }
    }
  }

  textInput(el) {
    this.text = el.srcElement.value;
    this.setUrl();
  }

  authorInput(el) {
    this.author = el.srcElement.value;
    this.setUrl();
  }

  colorChange(el) {
    this.color = el.detail.value;
    for (const color of this.colors) {
      if (this.color == color.color) {
        this.hex = color.hex;
      }
    }
    this.setUrl();
  }
  fontSizeChange(el) {
    this.fontSize = el.detail.value;
  }

  setUrl() {
    const url =
      "?text=" +
      encodeURIComponent(this.text) +
      "&author=" +
      encodeURIComponent(this.author) +
      "&color=" +
      this.color;
    history.pushState(null, null, url);
  }

  getQueryVariable(variable: string = "") {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
  }

  async share() {
    let navigator: any = window.navigator;
    if (navigator && navigator.share) {
      navigator
        .share({
          url: window.location.href,
          title: "",
          text: ""
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
    } else {
      this.execCopy(window.location.href);
      const toast = await this.toastCtrl.create({
        message: "URLをコピーしました",
        position: "top",
        duration: 800,
        showCloseButton: true,
        closeButtonText: "×"
      });
      await toast.present();
    }
  }

  execCopy(text: string) {
    var temp = document.createElement("div");
    temp.appendChild(document.createElement("pre")).textContent = text;
    var s = temp.style;
    s.position = "fixed";
    s.left = "-100%";
    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);
    document.execCommand("copy");
    document.body.removeChild(temp);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color={this.color}>
          <ion-title>はたらく言葉たちジェネレーター</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.share()}>
              <ion-icon name="share" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="content-wrapper">
          <div class="wrapper">
            <app-board
              text={this.text}
              author={this.author}
              color={this.hex}
              fontSize={this.fontSize}
            />
          </div>
        </div>
        <div class="text-editor-wrapper">
          <div class="title">本文</div>
          <ion-textarea
            placeholder="本文を入力"
            value={this.text}
            auto-grow={true}
            onInput={e => this.textInput(e)}
          />
        </div>
        <div class="author-editor-wrapper">
          <div class="title">肩書き</div>
          <ion-input
            placeholder="肩書きを入力"
            value={this.author}
            onInput={e => this.authorInput(e)}
          />
        </div>
        <div class="color-edit-wrapper">
          <div class="title">カラー</div>
          <ion-item>
            <ion-select
              onIonChange={e => this.colorChange(e)}
              value={this.color}
              okText="保存"
              cancelText="キャンセル"
            >
              {(() => {
                let list = [];
                for (const color of this.colors) {
                  list.push(
                    <ion-select-option value={color.color}>
                      {color.name}
                    </ion-select-option>
                  );
                }
                return list;
              })()}
            </ion-select>
          </ion-item>
        </div>
      </ion-content>
    ];
  }
}
