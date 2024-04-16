import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturedPokemonDialogComponent } from './captured-pokemon-dialog.component';

describe('CapturedPokemonDialogComponent', () => {
  let component: CapturedPokemonDialogComponent;
  let fixture: ComponentFixture<CapturedPokemonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturedPokemonDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapturedPokemonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
