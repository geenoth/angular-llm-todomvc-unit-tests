import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkAllComponent } from './filter-link-all.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkAllComponent', () => {
  let component: FilterLinkAllComponent;
  let fixture: ComponentFixture<FilterLinkAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterLinkAllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkAllComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "All" filter link', () => {
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]')).nativeElement;
    expect(linkElement).toBeTruthy();
    expect(linkElement.textContent).toBe('All');
  });

  it('should apply "selected" class if isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]')).nativeElement;
    expect(linkElement.classList).toContain('selected');
  });

  it('should not apply "selected" class if isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]')).nativeElement;
    expect(linkElement.classList).not.toContain('selected');
  });

  it('should call selectFilter() and log "All filter selected" on click', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-all"]')).nativeElement;
    linkElement.click();
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('All filter selected');
    consoleLogSpy.mockRestore();
  });
});