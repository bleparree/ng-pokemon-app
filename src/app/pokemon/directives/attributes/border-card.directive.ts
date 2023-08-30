import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

/** Rendering directive to determine how the pokemonList is rendered */
@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective implements OnInit {
  //Initial border color to render
  private initialColor: string = '#f5f5f5';
  //Defaut color to transform the border on the mouseEnter event (can be override by an input if defined)
  private defaultColor: string = '#009688';
  //Default style of the border (initialy AND on the mouseEnter)
  private defaultBorderStyle: string = 'solid';
  //Default Height of the rendering square
  private defaultHeight: number = 180;

  /**
   * Constructor
   * @param el Represent the Element used by this directive
   */
  constructor(private el: ElementRef) {}

  /**
   * Initialize Border Color/Style and height of the square
   */
  ngOnInit(): void {
    this.setBorder(this.initialColor, this.defaultBorderStyle);
    this.setHeight(this.defaultHeight);
  }

  //Default Attribute of the directive (affected with the directive name and not with the input name)
  @Input('pkmnBorderCard') borderColor: string;
  //Two secondaries but not mandatory attributes
  @Input() borderStyle: string;
  @Input() borderHeight: string;

  /** 
   * HostListener on the mouseEnter event of the current element
   * Change the color and style of the border
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor, this.borderStyle || this.defaultBorderStyle);
  }

  /** 
   * HostListener on the mouseLeave event of the current element
   * Restore initial color and style
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor, this.defaultBorderStyle);
  }

  /**
   * Configure the border style and color of the element
   * @param color Color to apply to the border
   * @param style Style to apply to the border
   */
  setBorder(color:string, style: string) {
    this.el.nativeElement.style.border = style + ' 4px ' + color;
  }

  /**
   * Configure the height of the square of the elemebt
   * @param height css height
   */
  setHeight(height:number) {
    this.el.nativeElement.style.height = (this.borderHeight || height) + 'px';
  }

}
