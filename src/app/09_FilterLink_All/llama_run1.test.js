import { TestBed, waitForAsync } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';
import {_By} from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

let component: FilterLinkAllComponent;
let fixture: TestBed;
let debugElement: DebugElement;

describe('FilterLinkAllComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterLinkAllComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLinkAllComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correctly with isSelected false', () => {
    component.isSelected = false;
    fixture.detectChanges();
    const linkElement = debugElement.query(By.dataTestId('filter-link-all'));
    expect(linkElement.nativeElement.textContent).toBe(' All ');
    expect(linkElement.nativeElement.classList.contains('selected')).toBeFalsy();
  });

  it('should render correctly with isSelected true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const linkElement = debugElement.query(By.dataTestId('filter-link-all'));
    expect(linkElement.nativeElement.textContent).toBe(' All ');
    expect(linkElement.nativeElement.classList.contains('selected')).toBeTruthy();
  });

  it('should call selectFilter when clicked', () => {
    const selectFilterSpy = jest.spyOn(component, 'selectFilter');
    const linkElement = debugElement.query(By.dataTestId('filter-link-all'));
    linkElement.triggerEventHandler('click', null);
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });
});