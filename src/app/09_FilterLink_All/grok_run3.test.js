import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';

describe('FilterLinkAllComponent', () => {
  let component: FilterLinkAllComponent;
  let fixture: ComponentFixture<FilterLinkAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLinkAllComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link with text "All"', () => {
    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.textContent.trim()).toBe('All');
  });

  it('should apply "selected" class when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.classList.contains('selected')).toBe(true);
  });

  it('should not apply "selected" class when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();
    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.classList.contains('selected')).toBe(false);
  });

  it('should call selectFilter on link click', () => {
    jest.spyOn(component, 'selectFilter');
    const linkElement = fixture.nativeElement.querySelector('a');
    linkElement.click();
    expect(component.selectFilter).toHaveBeenCalled();
  });

  it('should log "All filter selected" when selectFilter is called', () => {
    jest.spyOn(console, 'log');
    component.selectFilter();
    expect(console.log).toHaveBeenCalledWith('All filter selected');
  });

  it('should have data-testid attribute for testing', () => {
    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.getAttribute('data-testid')).toBe('filter-link-all');
  });
});