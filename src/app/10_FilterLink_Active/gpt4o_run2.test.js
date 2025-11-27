import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterLinkActiveComponent } from './filter-link-active.component';
import { By } from '@angular/platform-browser';

describe('FilterLinkActiveComponent', () => {
  let component: FilterLinkActiveComponent;
  let fixture: ComponentFixture<FilterLinkActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterLinkActiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterLinkActiveComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "Active" filter link', () => {
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]')).nativeElement;
    expect(linkElement).toBeTruthy();
    expect(linkElement.textContent).toBe('Active');
  });

  it('should apply "selected" class if isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]')).nativeElement;
    expect(linkElement.classList).toContain('selected');
  });

  it('should not apply "selected" class if isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]')).nativeElement;
    expect(linkElement.classList).not.toContain('selected');
  });

  it('should call selectFilter() and log "Active filter selected" on click', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('[data-testid="filter-link-active"]')).nativeElement;
    linkElement.click();
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Active filter selected');
    consoleLogSpy.mockRestore();
  });
});