import { Component, ElementRef, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DialogRef } from '@angular/cdk/dialog';

import { PokemonType } from '../data/pokemonType';
import { PokemonTypeService } from '../pokemonType.service';

/** 
 * Component of the PokemonType list edition (create/delete/update)
 * Nothing is really saved unil the clic on the save button
 */
@Component({
  selector: 'app-edit-pokemon-types',
  templateUrl: './edit-pokemon-types.component.html',
  styleUrls: ['./edit-pokemon-types.component.css']
})
export class EditPokemonTypesComponent implements OnInit, AfterViewInit {
  //Catch the "typename" element to manipulate it from component class
  @ViewChildren("typename") typenameInput: QueryList<ElementRef>;
  //Pokemon Type list to edit
  typeList:PokemonType[];
  //Current Pokemon Type in edition
  editType:PokemonType;
  //List of Pokemon Type to remove after the save
  toRemoveTypeList:PokemonType[];

  /**
   * Constructor
   * @param pokemonTypeService To get the pokemon Type list
   * @param dialogRef To render the component in a dialogbox
   */
  constructor(private pokemonTypeService:PokemonTypeService, public dialogRef: DialogRef) {}

  /**
   * Initialize:
   * - The pokemon to remove list
   * - Get the Pokemon Type List and sort them throught their positions
   */
  ngOnInit(): void {
    this.toRemoveTypeList = [];
    if (sessionStorage.getItem('bearertoken'))
      this.pokemonTypeService.getPokemonTypeList().subscribe((t) => {
        t = t.sort((a, b) => a.position - b.position);
        this.typeList = t; 
      });
  }

  /**
   * Called once Angular view have finished to load
   * => subscribe to the typenameinput change to call the setFocusOnEditType function
   * ==> typenameinput raise changes when the form change of type to update (after clic on the update button)
   */
  ngAfterViewInit(): void {
    this.typenameInput.changes.subscribe(() => {
      this.setFocusOnEditType();
    });
  }

  /**
   * Set the focus on the input TypeName and select the text inside (to accelerate the edition)
   */
  setFocusOnEditType() {
    if (this.typenameInput.length > 0) {
      this.typenameInput.first.nativeElement.focus();
      this.typenameInput.first.nativeElement.select();
    }
  }

  /**
   * ActionButton: 
   * - Add a new type to the PokemonType List (with default values)
   * - Put this new type in edition
   */
  addType(): void {
    if (!this.isEditMode() && this.typeList.findIndex((t:PokemonType) => t.name === 'NouveauType') < 0) {
      let maxP = Math.max.apply(Math, this.typeList.map(function(o) { return o.position; }))
      let newType:PokemonType = {
        id: 0,
        name:"NouveauType",
        color:"yellow",
        position: maxP+1
      }
      this.typeList.push(newType);
      this.editType = newType;
    }
  }

  /**
   * Return if their is a type in editmode
   * @returns True if one type is in editMode
   */
  isEditMode(): boolean {
    if (this.editType && this.editType.name)
      return true;
    else
      return false;
  }

  /**
   * Return if a specific type is the one currently edited
   * @param typeName Type to check
   * @returns True if the type to check is currently in editMode
   */
  isTypeInEditMode(typeName:string): boolean {
    if (this.editType && typeName === this.editType.name)
      return true;
    else
      return false;
  }

  /**
   * Enter in the edit mode
   * @param type Type who enter in the edit mode
   */
  editMode(type:PokemonType):void {
    this.editType = type;
  }

  /**
   * ActionButton: 
   * - Remove the type from the list
   * - update all positions of other elements in the list
   * - Add the type to the "toRemoveTypeList"
   * @param type 
   */
  deleteType(type:PokemonType):void {
    let i = this.typeList.findIndex((t:PokemonType) => t.name === type.name);
    if (i > -1) {
      this.typeList.splice(i, 1);
      this.typeList.forEach(element => {
        if (element.position > i + 1) element.position = element.position - 1;
      });
      if (type.id != 0) this.toRemoveTypeList.push(type);
    }
  }
  
  /**
   * ActionButton: 
   * - Validate the Pokemon Type Edition
   * - Update the type in the type list
   * - Reset the editType
   * @param type Type to update
   * @param name New name of the type
   * @param color New color of the type
   */
  updateType(type:PokemonType, name:string, color:string):void {
    let i = this.typeList.findIndex((t:PokemonType) => t.name === type.name);
    if (i > -1) {
      this.typeList[i].name = name;
      this.typeList[i].color = color;
    }
    this.editType = new PokemonType();
  }

  /**
   * Angular OnDrag/drop Event:
   * - Update positions of all elements
   * - Sort again the PokemonType list based on those new positions
   * @param event CdkDragDrop event containing the position who have change
   */
  updateTypePositions(event: CdkDragDrop<string[]>) {
    this.typeList.forEach(t => {
      switch (true) {
        case (t.position - 1 == event.previousIndex): t.position = event.currentIndex + 1; break;
        case (event.currentIndex < event.previousIndex && t.position - 1 >= event.currentIndex && t.position - 1 < event.previousIndex): t.position = t.position + 1; break;
        case (event.currentIndex > event.previousIndex && t.position - 1 <= event.currentIndex && t.position - 1 > event.previousIndex): t.position = t.position - 1; break;
      }
    });
    this.typeList = this.typeList.sort((a, b) => a.position - b.position);
  }

  /**
   * ActionButton: 
   * - Add all the new elements (those with an element id = 0)
   * - Update all those with an id <> from 0
   * - Remove all type in the toRemoveTypeList
   * - Close the dialogbox
   */
  savePokemonTypes() {
    this.typeList.forEach(element => {
      if (element.id == 0) {
        this.pokemonTypeService.addPokemonType(element).subscribe();
      }
      else {
        this.pokemonTypeService.updatePokemonType(element).subscribe();
      }
    });
    this.toRemoveTypeList.forEach(element => {
      this.pokemonTypeService.deletePokemonTypeById(element.id).subscribe();
    })
    this.dialogRef.close();
  }

  /**
   * ActionButton: Close the dialogBox (no save)
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
