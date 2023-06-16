import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorListComponent } from './fornecedor-list.component';

describe('FornecedorListComponent', () => {
  let component: FornecedorListComponent;
  let fixture: ComponentFixture<FornecedorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorListComponent]
    });
    fixture = TestBed.createComponent(FornecedorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
