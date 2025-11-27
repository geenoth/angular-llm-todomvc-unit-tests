import { TestBed, waitForAsync } from '@angular/core/testing';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';
import{_By} from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

let component: FilterLinkCompletedComponent;
let fixture: TestBed;
let debugElement: DebugElement;

describe('FilterLinkCompletedComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterLinkCompletedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLinkCompletedComponent);
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
    const linkElement = debugElement.query(By.dataTestId('filter-link-completed'));
    expect(linkElement.nativeElement.textContent).toBe(' Completed ');
    expect(linkElement.nativeElement.classList.contains('selected')).toBeFalsy();
  });

  it('should render correctly with isSelected true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const linkElement = debugElement.query(By.dataTestId('filter-link-completed'));
    expect(linkElement.nativeElement.textContent).toBe(' Completed ');
    expect(linkElement.nativeElement.classList.contains('selected')).toBeTruthy();
  });

  it('should call selectFilter when clicked', () => {
    const selectFilterSpy = jest.spyOn(component, 'selectFilter');
    const linkElement = debugElement.query(By.dataTestId('filter-link-completed'));
    linkElement.triggerEventHandler('click', null);
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);
  });
});